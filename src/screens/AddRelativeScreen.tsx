import React from 'react';
import { AddPatientPayload } from '../types/Patient';
import AddRelativeForm from '../components/AddRelativeForm';
import { View, ActivityIndicator, Alert } from 'react-native';
import { useAddPatientMutation } from '../api/patientApt';

const AddRelativeScreen: React.FC = ({ navigation }: any) => {
  const [addPatient, { isLoading }] = useAddPatientMutation();
  const handleFormSubmit = async (data: AddPatientPayload) => {
    try {
      const payload = {
        ...data,
        userid: '1000596100',
        orgid: '614',
        address: '',
      };
      await addPatient(payload).unwrap();
      Alert.alert('Success', 'Patient added successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to add patient:', JSON.stringify(error, null, 2));
      Alert.alert('Error', 'Failed to add patient');
    }
  };
  return (
    <View className="flex-1 bg-white">
      <AddRelativeForm onSubmit={handleFormSubmit} />
      {isLoading && <ActivityIndicator size="large" />}
    </View>
  );
};

export default AddRelativeScreen;
