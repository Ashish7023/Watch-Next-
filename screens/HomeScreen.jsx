import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import TrendingMovies from '../components/TrendingMovies';
import MoviesList from '../components/MoviesList';
import Loading from '../components/Loading';
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpCominggMovies,
} from '../api/API_CALLS';

const HomeScreen = () => {
  const [trending, setTrending] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    fetchDetail();
  }, []);
  const fetchDetail = async () => {
    setLoading(true);
    try {
      const [trendingResponse, upComingResponse, topRatedResponse] =
        await Promise.all([
          fetchTrendingMovies(),
          fetchUpCominggMovies(),
          fetchTopRatedMovies(),
        ]);
      const {data: trendingData} = trendingResponse;
      const {data: upComingData} = upComingResponse;
      const {data: topRatedData} = topRatedResponse;
      if (trendingData) setTrending(trendingData.results);
      if (upComingData) setUpComing(upComingData.results);
      if (topRatedData) setTopRated(topRatedData.results);
      setLoading(false);
      return;
    } catch (error) {
      console.log('Error is on HomePage : ' + error);
    }
  };

  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className="mb-3">
        <StatusBar translucent backgroundColor="transparent" />
        <View className="flex-row items-center justify-between mx-4 my-5 p-2">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-black">
            <Text className="text-[#eab308]">M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}>
          {/* Trending movies list */}
          <TrendingMovies data={trending} />
          {/* upComing movies List */}
          <MoviesList title={'upComing'} data={upComing} />
          {/* Top Rated Movies  */}
          <MoviesList title={'Top Rated'} data={topRated} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
