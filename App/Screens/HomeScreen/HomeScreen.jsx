import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './HomeScreenStyles';
import ScreenLayout from '../ScreenLayout/ScreenLayout';

const HomeScreen = ({ navigation }) => {
  return (
    <ScreenLayout>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Cửa sổ chính</Text> */}

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Bản đồ quy hoạch')}
          >
            <Image
            source={require('../../assets/iconBanDo.png')}
            style={styles.image}
            />
            <Text style={styles.cardText}>Bản đồ quy hoạch</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Error', { message: 'Trang này chưa được phát triển' })}  // Thay thế bằng tên màn hình
          >
            <Image
            source={require('../../assets/iconNghiaTrang.png')}
            style={styles.image}
            />
            <Text style={styles.cardText}>Nghĩa trang liệt sĩ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Error', { message: 'Trang này chưa được phát triển' })}  // Thay thế bằng tên màn hình
          >
            <Image
            source={require('../../assets/iconBanDoCaNhan.png')}
            style={styles.image}
            />
            <Text style={styles.cardText}>Bản đồ cá nhân</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Về chúng tôi')}  // Điều hướng tới trang "About Us"
          >
            <Image
            source={require('../../assets/iconAbout.png')}
            style={styles.image}
            />
            <Text style={styles.cardText}>Về chúng tôi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default HomeScreen;
