import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Patient } from '../types/Patient';
import { useGetPatientsQuery } from '../api/patientApt';

type PatientListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PatientList'
>;

type Props = {
  navigation: PatientListScreenNavigationProp;
};

const PatientListScreen: React.FC<Props> = ({ navigation }) => {
  const { data, isLoading, error } = useGetPatientsQuery('1000596100');

  if (isLoading) return <ActivityIndicator size="large" />;
  if (error) {
    return <Text>Error loading patients</Text>;
  }

  const renderItem = ({ item }: { item: Patient }) => (
    <TouchableOpacity>
      <View className="bg-white p-4 my-2 rounded-lg shadow-sm flex-row">
        <Text className="text-lg font-bold text-gray-800">{`${item.fname} ${item.lname}`}</Text>
        <Text className="text-gray-600 ml-auto">{item.gender}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFloatingButton = () => {
    return (
      <TouchableOpacity
        className="absolute bottom-4 right-4 bg-blue-500  rounded-full shadow-lg h-20 w-20 items-center justify-center"
        onPress={() => navigation.navigate('AddPatient')}
      >
        <Text className="text-white text-5xl font-bold">+</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 px-4">
      <FlatList data={data} renderItem={renderItem} />
      {renderFloatingButton()}
    </View>
  );
};

export default PatientListScreen;
