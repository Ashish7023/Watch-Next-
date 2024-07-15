import {WINDOWS} from 'nativewind/dist/utils/selector';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {StarIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import {Image185} from '../api/OTHER_ENDPOINTS';
const {width, height} = Dimensions.get('window');
const MoviesList = ({title, data}) => {
  const navigation = useNavigation();
  const Moviename = 'Ashishssddsfdsfdsffsdfsfsdfdfsfsfsfif';
  return (
    <View className="space-y-4 mt-4 mb-2">
      <View className="flex-1 items-center justify-between flex-row mx-4">
        <Text className="text-xl font-black">{title}</Text>
        <TouchableOpacity>
          <Text className="text-[#eab308] text-lg ">see all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{paddingHorizontal: 16}}
        showsHorizontalScrollIndicator={false}>
        {data &&
          data.map((Movie, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push('Movie', Movie)}>
                <View className="mr-4 sopce-y-4">
                  <View className="w-14 h-6 absolute z-20 right-1 top-1 flex-1 p-1 justify-between rounded-xl">
                    <Text className="text-white"> IMDB </Text>
                    <View className="flex-row justify-around items-center ">
                      <StarIcon size="18" strokeWidth={2} color="yellow" />
                      <Text className=" text-sm mix-blend-difference	">
                        {Movie?.vote_average?.toFixed(1)}
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={{uri: `${Image185(Movie.poster_path)}`}}
                    style={{
                      width: width * 0.3,
                      height: height * 0.18,
                      borderRadius: 12,
                    }}
                  />
                  <Text>
                    {Movie.title?.length > 20
                      ? `${Movie.title.substring(0, 20) + '...'}`
                      : Movie.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default MoviesList;
