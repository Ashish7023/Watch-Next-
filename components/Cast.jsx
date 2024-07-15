import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Image185} from '../api/OTHER_ENDPOINTS';
const Cast = ({cast}) => {
  const navigation = useNavigation();
  const carecterName = 'jone wick ';
  const actorName = 'kenzia reves ';
  return (
    <View className="my-6 px-4">
      <Text className="text-white text-lg mb-3">Top Cast </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{padding: 8}}>
        {cast &&
          cast.map((cast, index) => {
            return (
              <TouchableOpacity
                className="mr-3 items-center"
                key={index}
                onPress={() => navigation.navigate('Person', cast)}>
                <View className="w-20 h-20 rounded-full overflow-hidden border border-neutral-400 flex items-center justify-center">
                  <Image
                    className="w-full h-full object-cover"
                    source={{uri: `${Image185(cast?.profile_path)}`}}
                  />
                </View>
                <Text className="text-white text-xs mt-1">
                  {cast.character?.length > 14
                    ? `${cast.character?.substring(0, 14)} ...`
                    : cast?.character}
                </Text>
                <Text className="text-neutral-400 text-xs mt-1">
                  {cast.original_name?.length > 14
                    ? `${cast.original_name?.substring(0, 14)} ...`
                    : cast.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;
