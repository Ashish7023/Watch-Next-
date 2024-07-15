import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {XMarkIcon} from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';
import {searchMovies} from '../api/API_CALLS';
import {Image185} from '../api/OTHER_ENDPOINTS';
const {width, height} = Dimensions.get('window');
const SearchScreen = () => {
  const [result, setResult] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchMovie, setSearchMovie] = React.useState('');
  const navigation = useNavigation();
  const movieName = 'dsfsfsdfsfffsfs';
  const deBounc = (func, waitTime) => {
    let Timer_id;
    return val => {
      if (Timer_id) clearTimeout(Timer_id);
      Timer_id = setTimeout(() => {
        func(val);
      }, waitTime);
    };
  };
  const handleSearch = async value => {
    if (!value) return;
    setSearchMovie(value);
    try {
      const {data} = await searchMovies(value);
      setResult(data.results);
    } catch (error) {
      console.log('error' + error);
    }
  };
  const deBounceCall = deBounc(handleSearch, 700);
  return (
    <SafeAreaView className="bg-neutral-800 flex-1 ">
      <View className="mx-4 mb-3 mt-4  flex-row justify-between items-center   border border-neutral-500 rounded-full">
        <TextInput
          name="search"
          onChangeText={val => deBounceCall(val)}
          placeholder="Search Movies"
          placeholderTextColor={'lightgray'}
          className="flex-1 text-base font-semibold text-white tracking-tighter px-6"
        />
        <TouchableOpacity
          className="rounded-full p-3 m-1 bg-neutral-500"
          onPress={() => navigation.navigate('Home')}>
          <XMarkIcon size="30" strokeWidth={2} color="white" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <>
          {result.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{paddingHorizontal: 15}}
              className="space-y-3">
              <Text className="text-white  font-semibold ml-3 mt-1">
                Results : ( {result.length} )
              </Text>
              <View className="flex-row justify-between flex-wrap ">
                {result.map((movie, index) => {
                  return (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => navigation.push('Movie', movie)}>
                      <View className="space-y-2 mb-3">
                        <Image
                          source={{uri: `${Image185(movie.poster_path)}`}}
                          style={{width: width * 0.44, height: height * 0.3}}
                          className="rounded-3xl"
                        />
                        <Text className="text-white text-center">
                          {movie?.title?.length > 30
                            ? movie?.title.slice(0, 30) + '...'
                            : movie?.title}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            </ScrollView>
          ) : (
            <View className="flex-row justify-center">
              <Image
                source={require('../assets/IMG/NoResult.png')}
                className="w-96 h-96"
              />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
