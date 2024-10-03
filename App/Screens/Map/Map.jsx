import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import Slider from '@react-native-community/slider';
import SwitchToggle from 'react-native-switch-toggle';
import axios from 'axios';
import styles from './MapStyles';
import ScreenLayout from '../ScreenLayout/ScreenLayout';

const Map = ({ navigation }) => {
  const [mapData, setMapData] = useState(null);
  const [mbtilesOpacity, setMbtilesOpacity] = useState(1);
  const [showMbtiles, setShowMbtiles] = useState(true);

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
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Bản đồ quận Ba Đình</Text>
          <SwitchToggle
            switchOn={showMbtiles}
            onPress={() => setShowMbtiles(!showMbtiles)}
            containerStyle={styles.toggleSwitch}
            circleStyle={styles.toggleCircle}
            circleColorOff='#ffffff'
            circleColorOn='#ffffff'
            backgroundColorOn='blue'
            backgroundColorOff='#e9e9e9'
          />
        </View>

        <View style={styles.controlsContainer}>
          {showMbtiles && (
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Độ trong suốt MBTiles:</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                step={0.1}
                value={mbtilesOpacity}
                onValueChange={setMbtilesOpacity}
              />
            </View>
          )}
        </View>

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
            urlTemplate="http://192.168.100.176:3000/{z}/{x}/{y}.png"
          {showMbtiles && (
            <UrlTile
              zIndex={1}
              opacity={mbtilesOpacity}
              tileSize={256}
              maximumZ={17}
              minimumZ={13}
            />
          )}
          
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

        
      </View>
    </ScreenLayout>
  );
};

export default Map;
