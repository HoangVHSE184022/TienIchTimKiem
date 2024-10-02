import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import styles from './MapStyles';
import ScreenLayout from '../ScreenLayout/ScreenLayout';

const Map = ({ navigation }) => {
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
      <View style={styles.container}>
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
      </View>
    </ScreenLayout>
  );
};

export default Map;
