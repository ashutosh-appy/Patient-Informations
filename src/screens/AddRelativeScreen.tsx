import React from 'react';
import { AddPatientPayload } from '../types/Patient';
import AddRelativeForm from '../components/AddRelativeForm';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useAddPatientMutation } from '../api/patientApt';

const AddRelativeScreen: React.FC = ({ navigation }: any) => {
  const [addPatient] = useAddPatientMutation();
  const handleFormSubmit = async (data: AddPatientPayload) => {
    try {
      const payload = {
        ...data,
        address: '',
      };
      console.log('Submitting form with data:', payload);
      await addPatient(payload).unwrap();
      Alert.alert('Success', 'Patient added successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to add patient:', JSON.stringify(error, null, 2));
      Alert.alert('Error', 'Failed to add patient');
    }
  };
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <AddRelativeForm onSubmit={handleFormSubmit} />
    </KeyboardAvoidingView>
  );
};

export default AddRelativeScreen;
