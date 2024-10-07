import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './App/Screens/HomeScreen/HomeScreen';
import AboutUs from './App/Screens/AboutUs/AboutUs';
import Login from './App/Screens/Login/Login';
import Register from './App/Screens/Register/Register';
import TermsOfService from './App/Screens/TermsOfService/TermsOfService';
import PrivacyPolicy from './App/Screens/PrivacyPolicy/PrivacyPolicy';
import UserGuide from './App/Screens/UserGuide/UserGuide';
import Profile from './App/Screens/Profile/Profile';
import ChangeEmail from './App/Screens/ChangeEmail/ChangeEmail';
import ChangePassword from './App/Screens/ChangePassword/ChangePassword';
import Map from './App/Screens/Map/Map';
import ErrorScreen from './App/Screens/Error/Error';
import Cemetery from './App/Screens/Cemetery/Cemetery';
import { DatabaseProvider } from './App/Database/DatabaseContext';
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack cho phần login và đăng ký
function AuthStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Đăng nhập">
        {props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="Đăng ký" component={Register} />
    </Stack.Navigator>
  );
}

// Custom Drawer Content để thêm nút đăng xuất
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

// Hàm tạo màn hình chưa phát triển
const createUnderDevelopmentScreen = (message) => {
  return ({ navigation }) => (
    <ErrorScreen navigation={navigation} route={{ params: { message } }} />
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Hàm đăng xuất
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <DatabaseProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => (
            <CustomDrawerContent {...props} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          )}
        >
          {/* Trang Home */}
          <Drawer.Screen name="Trang chủ" component={HomeScreen} />

          {/* Trang Bản đồ quy hoạch */}
          <Drawer.Screen name="Bản đồ quy hoạch" component={Map} />

          {/* Trang Nghĩa trang liệt sĩ */}
          <Drawer.Screen name="Nghĩa trang liệt sĩ" component={Cemetery} />

          {/* Trang Bản đồ cá nhân */}
          <Drawer.Screen
            name="Bản đồ cá nhân"
            component={createUnderDevelopmentScreen('Trang Bản đồ cá nhân đang được phát triển')}
            options={{ title: 'Bản đồ cá nhân' }}
          />

          {/* Trang About Us */}
          <Drawer.Screen name="Về chúng tôi" component={AboutUs} />

          {/* Trang Terms of Service */}
          <Drawer.Screen name="Điều khoản dịch vụ" component={TermsOfService} />

          {/* Trang Privacy Policy */}
          <Drawer.Screen name="Chính sách quyền riêng tư" component={PrivacyPolicy} />

          {/* Trang User Guide */}
          <Drawer.Screen name="Hướng dẫn sử dụng" component={UserGuide} />

          {/* Điều kiện để hiển thị Profile hoặc Login */}
          {isLoggedIn ? (
            <Drawer.Screen name="Thông tin cá nhân" component={Profile} />
          ) : (
            <Drawer.Screen name="Đăng nhập">
              {props => <AuthStack {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Drawer.Screen>
          )}

          {/* Các màn hình không hiển thị trong menu */}
          <Drawer.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{
              drawerItemStyle: { display: 'none' },
              title: 'Đổi mật khẩu'
            }}
          />
          <Drawer.Screen
            name="ChangeEmail"
            component={ChangeEmail}
            options={{
              drawerItemStyle: { display: 'none' },
              title: 'Đổi email'
            }}
          />
          <Drawer.Screen
            name="Error"
            component={ErrorScreen}
            options={{
              drawerItemStyle: { display: 'none' },
              title: 'Lỗi'
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </DatabaseProvider>
  );
}
