import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PatientListScreen from '../screens/PatientListScreen';
import AddPatientScreen from '../screens/AddPatientScreen';

export type RootStackParamList = {
  PatientList: undefined;
  AddPatient: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="PatientList">
      <Stack.Screen name="PatientList" component={PatientListScreen} />
      <Stack.Screen name="AddPatient" component={AddPatientScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
