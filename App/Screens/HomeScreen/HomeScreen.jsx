import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
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
        'https://nominatim.openstreetmap.org/search?format=json&q=Ba Dinh District, Hanoi, Vietnam'
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
      <View style={styles.container}>
        <Text style={styles.title}>Bản đồ quận Ba Đình</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 21.037457,
            longitude: 105.829991,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          minZoomLevel={13}
          maxZoomLevel={17}
          initialZoomLevel={15}
        >
          {/* Lớp bản đồ từ file MBTiles */}
          <UrlTile
            urlTemplate="http://192.168.100.176:3000/{z}/{x}/{y}.png"
            zIndex={1}
            opacity={1}
            tileSize={256}
            maximumZ={17}
            minimumZ={13}
          />
          
          {/* Lớp bản đồ OpenStreetMap */}
          <UrlTile
            urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            zIndex={2}
            opacity={0.7}
          />

          <Marker
            coordinate={{
              latitude: 21.037457,
              longitude: 105.829991,
            }}
            title="Quận Ba Đình"
          />
        </MapView>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('About Us')}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>About Us</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

export default HomeScreen;
