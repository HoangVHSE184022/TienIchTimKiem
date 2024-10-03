import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import Slider from '@react-native-community/slider';
import SwitchToggle from 'react-native-switch-toggle';
import axios from 'axios';
import styles from './MapStyles';
import ScreenLayout from '../ScreenLayout/ScreenLayout';
import Geolocation from 'react-native-geolocation-service'; // {{ edit_1 }}

const Map = ({ navigation }) => {
  const [mapData, setMapData] = useState(null);
  const [marker, setMarker] = useState(null); 
  const [userLocation, setUserLocation] = useState(null); // {{ edit_2 }}

  useEffect(() => {
    fetchMapData();
    getUserLocation(); // Fetch user location on mount
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

  const getUserLocation = () => { // {{ edit_3 }}
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude }); // Set user location
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleMapPress = (event) => { 
    const { coordinate } = event.nativeEvent;
    if (marker && marker.latitude === coordinate.latitude && marker.longitude === coordinate.longitude) {
      setMarker(null); // Remove marker if tapped again
    } else {
      setMarker(coordinate); // Set new marker
    }
  };

  const handleMarkerPress = () => {
    if (marker) {
      alert(`Lat: ${marker.latitude.toFixed(6)}, Lon: ${marker.longitude.toFixed(6)}`);
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
          onPress={handleMapPress}
        >
          {/* Lớp bản đồ từ file MBTiles */}
          {/* ... existing UrlTile components ... */}

          {marker && ( // Render user-set marker
            <Marker
              coordinate={marker}
              onPress={handleMarkerPress}
            />
          )}

          {userLocation && ( // Render user location marker
            <Marker
              coordinate={userLocation}
              title="Your Location" // Display user location title
              pinColor="blue" // Change color for user location marker
            />
          )}
        </MapView>

        
      </View>
    </ScreenLayout>
  );
};

export default Map;
