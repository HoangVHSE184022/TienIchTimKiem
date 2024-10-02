import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import styles from './HomeScreenStyles';
import ScreenLayout from '../ScreenLayout/ScreenLayout';

const HomeScreen = ({ navigation }) => {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    fetchMapData();
  }, []);

  const fetchMapData = async () => {
    try {
      const response = await axios.get(
        'https://nominatim.openstreetmap.org/search?format=json&q=Hanoi'
      );
      if (response.data && response.data.length > 0) {
        setMapData(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching map data:', error);
    }
  };

  return (
    <ScreenLayout>
      {/* <View style={styles.container}>
        <Text style={styles.title}>Màn hình chính</Text>
        {mapData && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: parseFloat(mapData.lat),
              longitude: parseFloat(mapData.lon),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: parseFloat(mapData.lat),
                longitude: parseFloat(mapData.lon),
              }}
              title={mapData.display_name}
            />
          </MapView>
        )}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('About Us')}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>About Us</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Cửa sổ chính</Text> */}

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('QuyHoachMap')}  // Thay thế bằng tên màn hình
          >
            <Text style={styles.cardText}>Bản đồ quy hoạch</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('NghiaTrangScreen')}  // Thay thế bằng tên màn hình
          >
            <Text style={styles.cardText}>Nghĩa trang liệt sĩ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BanDoCaNhanScreen')}  // Thay thế bằng tên màn hình
          >
            <Text style={styles.cardText}>Bản đồ cá nhân</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Về chúng tôi')}  // Điều hướng tới trang "About Us"
          >
            <Text style={styles.cardText}>Về chúng tôi</Text>
          </TouchableOpacity>
        </View>
      {/* </View> */}
    </ScreenLayout>
  );
};

export default HomeScreen;
