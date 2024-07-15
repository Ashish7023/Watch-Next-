import React from 'react';
import * as Progress from 'react-native-progress';

import {View, Text, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const Loading = () => {
  return (
    <View
      style={{width, height}}
      className="flex-row items-center justify-center bg-neutral-800 flex-1">
      <Progress.CircleSnail
        size={80}
        indeterminate={true}
        thickness={5}
        color={'#eab308'}
      />
    </View>
  );
};

export default Loading;
