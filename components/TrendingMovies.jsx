import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import {Image500} from '../api/OTHER_ENDPOINTS';
import {StarIcon} from 'react-native-heroicons/solid';
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const TrendingMovies = ({data}) => {
  const navigation = useNavigation();
  const handleClick = item => {
    navigation.navigate('Movie', item);
  };
  return (
    <View style={{marginBottom: 8}}>
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          marginHorizontal: 16,
          marginBottom: 20,
        }}
        className=" bold-black">
        Trending
      </Text>
      <Carousel
        sliderWidth={windowWidth}
        sliderHeight={windowWidth}
        itemWidth={windowWidth * 0.62}
        slideStyle={{display: 'flex', alignItems: 'center'}}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        data={data}
        renderItem={({item}) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
      />
    </View>
  );
};

const MovieCard = ({item, handleClick}) => {
  return (
    <TouchableOpacity onPress={() => handleClick(item)}>
      <>
        <View className="w-20 h-12 absolute z-20 right-3 top-3 flex-1 p-1 justify-between rounded-xl">
          <Text className="text-white"> IMDB </Text>
          <View className="flex-row justify-around items-center ">
            <StarIcon size="25" strokeWidth={2} color="yellow" />
            <Text className=" text-xl mix-blend-difference	">
              {item?.vote_average?.toFixed(1)}
            </Text>
          </View>
        </View>
        <Image
          source={{uri: `${Image500(item.poster_path)}`}}
          style={{
            width: windowWidth * 0.6,
            height: windowHeight * 0.4,
            borderRadius: 20,
          }}
        />
      </>
    </TouchableOpacity>
  );
};

export default TrendingMovies;
