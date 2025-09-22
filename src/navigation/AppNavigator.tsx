import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PatientListScreen from '../screens/PatientListScreen';
import AddRelativeScreen from '../screens/AddRelativeScreen';

export type RootStackParamList = {
  PatientList: undefined;
  AddRelative: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="PatientList">
      <Stack.Screen name="PatientList" component={PatientListScreen} />
      <Stack.Screen name="AddRelative" component={AddRelativeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
