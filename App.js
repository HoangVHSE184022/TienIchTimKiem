import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './App/Screens/HomeScreen/HomeScreen';
import AboutUs from './App/Screens/AboutUs/AboutUs';
import Login from './App/Screens/Login/Login';
import Register from './App/Screens/Register/Register';
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="About Us" component={AboutUs} />
        <Drawer.Screen name="Login" component={AuthStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

