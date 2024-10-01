import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './App/Screens/HomeScreen/HomeScreen';
import AboutUs from './App/Screens/AboutUs/AboutUs';
import Login from './App/Screens/Login/Login';
import Register from './App/Screens/Register/Register';
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function AuthStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {props.isLoggedIn && (
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            padding: 10,
            margin: 10,
            borderRadius: 5,
          }}
          onPress={props.handleLogout}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Đăng xuất</Text>
        </TouchableOpacity>
      )}
    </DrawerContentScrollView>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <CustomDrawerContent {...props} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        )}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="About Us" component={AboutUs} />
        {isLoggedIn ? (
          <Drawer.Screen name="Profile" component={HomeScreen} />
        ) : (
          <Drawer.Screen name="Login">
            {props => <AuthStack {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Drawer.Screen>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

