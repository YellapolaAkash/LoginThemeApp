import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LoginScreen } from '../screens/LoginScreen';

export type RootStackParamList = {
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />
    </Stack.Navigator>
  );
};
