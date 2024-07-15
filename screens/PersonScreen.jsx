import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {SafeAreaView} from 'react-native-safe-area-context';
import MoviesList from '../components/MoviesList';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';
import {fetchPersonDetails, fetchPersonCredit} from '../api/API_CALLS';
import {Image342, Image500} from '../api/OTHER_ENDPOINTS';
const {width, height} = Dimensions.get('window');
const PersonScreen = ({route}) => {
  const [isFovourite, setIsFovourite] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [person, setPerson] = React.useState({});
  const [personMovies, setPersonMovies] = React.useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 11,
  ]);
  const navigation = useNavigation();
  React.useEffect(() => {
    getPersonDetails();
    getPersonMovies();
  }, []);
  const getPersonDetails = async () => {
    try {
      const {data} = await fetchPersonDetails(route.params.id);
      if (data) setPerson(data);
      return;
    } catch (error) {
      console.log(error + error);
      return;
    }
  };
  const getPersonMovies = async () => {
    try {
      const {data} = await fetchPersonCredit(route.params.id);
      if (data) setPersonMovies(data);
      return;
    } catch (error) {
      console.log(error + error);
      return;
    }
  };
  return (
    <ScrollView className="flex-1 bg-neutral-800">
      <SafeAreaView className="w-full flex-1 flex-row justify-between  px-4 py-6">
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
        <View className=" flex-1 items-center justify-center ">
          <View className="rounded-full items-center h-72 w-72 overflow-hidden border-2 border-neutral-500 flex justify-center">
            <Image
              source={{uri: `${Image342(person.profile_path)}`}}
              style={{height: height * 0.43, width: width * 0.74}}
            />
          </View>
        </View>
      )}
      <View className="mt-6">
        <Text className="text-3xl text-white font-black tracking-wide text-center">
          {person?.name}
        </Text>
        <Text className="text-base text-neutral-400 text-center">
          {person?.place_of_birth}
        </Text>
      </View>
      <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-500 rounded-full">
        <View className="border-r-2 border-r-neutral-400 px-2 items-center w-1/4">
          <Text className="text-white font-semibold">Gender</Text>
          <Text className=" text-sm text-neutral-300">
            {person?.gender === 1 ? 'Female' : 'Male'}
          </Text>
        </View>
        <View className="border-r-2 border-r-neutral-400 px-2 items-center w-1/4">
          <Text className="text-white font-semibold">Birthday</Text>
          <Text className=" text-sm text-neutral-300">{person?.birthday}</Text>
        </View>
        <View className="border-r-2 border-r-neutral-400 px-2 items-center w-1/4 ">
          <Text className="text-white font-semibold">Know for</Text>
          <Text className=" text-sm text-neutral-300">
            {person?.known_for_department}
          </Text>
        </View>
        <View className=" px-2 items-center w-1/4">
          <Text className="text-white font-semibold">popularty</Text>
          <Text className=" text-sm text-neutral-300">
            {person?.popularity?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View className="my-6 mx-4 space-y-2">
        <Text className="text-white font-black text-xl">Biography</Text>
        <Text className="text-neutral-400 tracking-tighter ">
          {person?.biography}
        </Text>
      </View>
      <MoviesList title={"Movie's "} data={personMovies.cast} />
    </ScrollView>
  );
};

export default PersonScreen;
