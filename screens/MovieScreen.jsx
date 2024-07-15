import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import MoviesList from '../components/MoviesList';
import Loading from '../components/Loading';
import {
  fetchMoviesCredits,
  fetchMoviesDetails,
  fetchSimilarMovies,
} from '../api/API_CALLS';
import {Image500} from '../api/OTHER_ENDPOINTS';

const {width, height} = Dimensions.get('window');
const MovieScreen = ({route}) => {
  const [isFovourite, setIsFovourite] = React.useState(false);
  const [cast, setCast] = React.useState([]);
  const [similer, setSimiler] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [movie, setMovie] = React.useState({});
  const navigation = useNavigation();
  React.useEffect(() => {
    fetchData(route.params.id);
  }, []);
  const fetchData = async _id => {
    setLoading(true);
    try {
      // Call all three APIs concurrently
      const [detailsResponse, creditsResponse, similarResponse] =
        await Promise.all([
          fetchMoviesDetails(_id),
          fetchMoviesCredits(_id),
          fetchSimilarMovies(_id),
        ]);

      // Destructure responses
      const {data: detailsData} = detailsResponse;
      const {data: creditsData} = creditsResponse;
      const {data: similarData} = similarResponse;

      // Update states
      if (detailsData) setMovie(detailsData);
      if (creditsData) setCast(creditsData?.cast);
      if (similarData) setSimiler(similarData?.results);

      // Update loading state after all data is set
      setLoading(false);
      return;
    } catch (error) {
      console.log(error);
      // Handle errors as needed
    }
  };

  return (
    <ScrollView className="bg-neutral-800 flex-1">
      <View className="w-full">
        <SafeAreaView className=" absolute z-20 w-full flex-1 flex-row justify-between  px-4 py-6">
          <TouchableOpacity
            className="rounded-xl p-2 bg-[#eab308] w-11 h-11 "
            onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-xl p-1 w-11 h-11 "
            onPress={() => setIsFovourite(!isFovourite)}>
            <HeartIcon
              size="35"
              strokeWidth={2.5}
              color={isFovourite ? 'red' : 'white'}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{uri: `${Image500(movie.poster_path)}`}}
              style={{width: width, height: height * 0.55}}
            />
            <LinearGradient
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              colors={['transparent', 'rgba(39,39,39,0.8)', 'rgba(39,39,39,1)']}
              style={{width, height: height * 0.4}}
              className="absolute bottom-0"></LinearGradient>
          </View>
        )}
        <View className="space-y-3">
          <Text className="text-white text-center text-3xl font-bold tracking-widest ">
            {movie.title}
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center ">
            {movie.status} • {movie?.release_date?.split('-')[0]} •{' '}
            {movie.runtime} min
          </Text>
          <View className="flex-1 items-center justify-center flex-row">
            {movie?.genres &&
              movie?.genres?.map((genres, index) => {
                let showDot = index + 1 != movie?.genres?.length;
                return (
                  <Text
                    className="text-neutral-400 font-semibold text-base text-center mx-1 "
                    key={index}>
                    {genres?.name} {showDot ? '•' : ''}
                  </Text>
                );
              })}
          </View>
          <Text className="text-neutral-400  ml-2 tracking-wider">
            {movie?.overview}
          </Text>
        </View>
      </View>
      <Cast cast={cast} />
      <MoviesList title={'Similer Movies'} data={similer} />
    </ScrollView>
  );
};

export default MovieScreen;
