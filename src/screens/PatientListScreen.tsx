import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Trash2, SquareArrowOutDownRightIcon } from 'lucide-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Patient } from '../types/Patient';
import { useGetPatientsQuery } from '../api/patientApt';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type PatientListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PatientList'
>;

type Props = {
  navigation: PatientListScreenNavigationProp;
};

const PatientListScreen: React.FC<Props> = ({ navigation }) => {
  const { isLoading, error } = useGetPatientsQuery('1000596100');
  const patients = useSelector((state: RootState) => state.patient.patients);

  if (isLoading) return <ActivityIndicator size="large" />;
  if (error) {
    return <Text>Error loading patients</Text>;
  }

  const renderItem = ({ item }: { item: Patient }) => (
    <TouchableOpacity>
      <View className="bg-white p-4 my-2 rounded-lg shadow-sm">
        <View className="flex-row justify-between">
          <Text className="text-lg font-bold text-gray-800 flex-1">{`${item.fname} ${item.lname}`}</Text>
          <View className="flex-row flex-1 justify-end">
            <Trash2 size={20} style={{ marginRight: 10 }} />
            <SquareArrowOutDownRightIcon
              size={20}
              style={{ marginRight: 10 }}
            />
          </View>
        </View>
        <Text className="p-2 my-3 bg-green-800 flex-wrap color-white font-bold rounded-full w-auto self-start">
          Relative
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderFloatingButton = () => {
    return (
      <TouchableOpacity
        className="absolute bottom-4 right-4 bg-blue-500  rounded-full shadow-lg h-20 w-20 items-center justify-center"
        onPress={() => navigation.navigate('AddRelative')}
      >
        <Text className="text-white text-5xl font-bold ">+</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 px-4">
      <FlatList data={patients} renderItem={renderItem} />
      {renderFloatingButton()}
    </View>
  );
};

export default PatientListScreen;
