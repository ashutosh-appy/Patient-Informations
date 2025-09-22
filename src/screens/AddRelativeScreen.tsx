import React from 'react';
import { AddPatientPayload } from '../types/Patient';
import AddRelativeForm from '../components/AddRelativeForm';
import { View } from 'react-native';

const AddRelativeScreen: React.FC = ({ navigation }: any) => {
  const handleFormSubmit = (data: AddPatientPayload) => {
    console.log('Form Data:', data);
    navigation.goBack();
  };
  return (
    <View className="flex-1 bg-white">
      <AddRelativeForm onSubmit={handleFormSubmit} />;
    </View>
  );
};

export default AddRelativeScreen;
