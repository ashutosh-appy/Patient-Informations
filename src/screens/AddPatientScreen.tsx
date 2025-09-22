import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { styles } from './styles';
import { useAppDispatch } from '../redux/hooks';
import { addPatient } from '../redux/slices/patientSlice';
import { Patient } from '../types/Patient';

const AddPatientScreen: React.FC = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [age, setAge] = useState('');
  const [mobileno, setMobileno] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');

  const handleAddPatient = () => {
    if (!fname || !lname || !age || !mobileno || !gender) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newPatient: Patient = {
      fname,
      lname,
      age: parseInt(age, 10),
      mobileno,
      gender,
    };

    dispatch(addPatient(newPatient));
    Alert.alert('Success', 'Patient added successfully!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={fname}
        onChangeText={setFname}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lname}
        onChangeText={setLname}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Gender (Male, Female, Other)"
        value={gender}
        onChangeText={text => setGender(text as 'Male' | 'Female' | 'Other')}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile No"
        value={mobileno}
        onChangeText={setMobileno}
        keyboardType="phone-pad"
      />
      <Button title="Add Patient" onPress={handleAddPatient} />
    </View>
  );
};

export default AddPatientScreen;
