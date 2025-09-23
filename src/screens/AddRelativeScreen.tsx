import React from 'react';
import { AddPatientPayload, Patient } from '../types/Patient';
import AddRelativeForm from '../components/AddRelativeForm';
import { View, ActivityIndicator, Alert } from 'react-native';
import { useAddPatientMutation } from '../api/patientApt';
import { useDispatch } from 'react-redux';
import { addPatient as addPatientToState } from '../redux/slices/patientSlice';

const AddRelativeScreen: React.FC = ({ navigation }: any) => {
  const [addPatient, { isLoading }] = useAddPatientMutation();
  const dispatch = useDispatch();
  const handleFormSubmit = async (data: AddPatientPayload) => {
    try {
      await addPatient(data).unwrap();
      const newPatient: Partial<Patient> = {
        userid: `temp-${Date.now()}`,
        fname: data.fname,
        lname: data.lname,
      };
      dispatch(addPatientToState(newPatient as Patient));
      Alert.alert('Success', 'Patient added successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to add patient:', JSON.stringify(error, null, 2));
      Alert.alert(
        'Error',
        `Failed to add patient: ${error.data?.message || 'Unknown error'}`,
      );
    }
  };
  return (
    <View className="flex-1 bg-white">
      <AddRelativeForm onSubmit={handleFormSubmit} />
      {isLoading && (
        <View className="absolute inset-0 items-center justify-center opacity-70 bg-black">
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </View>
  );
};

export default AddRelativeScreen;
