import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
  const [marker, setMarker] = useState(null); // State for marker
  const [showMarker, setShowMarker] = useState(true); // State to toggle marker visibility

  useEffect(() => {
    fetchMapData();
  }, []);

  const fetchMapData = async () => {
    // ... existing code to fetch map data ...
  };

  const handleMapPress = (event) => { 
    const { coordinate } = event.nativeEvent;
    if (marker && marker.latitude === coordinate.latitude && marker.longitude === coordinate.longitude) {
      setMarker(null); // Remove marker if tapped again
    } else {
      setMarker({
        coordinate, // Set the coordinate
        title: `Lat: ${coordinate.latitude.toFixed(6)}, Lon: ${coordinate.longitude.toFixed(6)}` // Set title with lat and lon
      });
    }
  };

  const toggleMarkerVisibility = () => { // Function to toggle marker visibility
    setShowMarker(!showMarker);
  };

  return (
    <ScreenLayout>  
      <View style={styles.container}>
        <Text style={styles.title}>Bản đồ quận Ba Đình</Text>
        <View style={styles.headerContainer}>
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
          onPress={handleMapPress} // Handle map press to set marker
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
            urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
            minimumZ={1}
            zIndex={0}
          />

          {showMarker && marker && ( // Render user-set marker based on visibility
            <Marker
              coordinate={marker.coordinate}
              title={marker.title} // Display lat and lon as title
            />
          )}
        </MapView>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={toggleMarkerVisibility} // Toggle marker visibility
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>{showMarker ? 'Hide Marker' : 'Show Marker'}</Text>
          </View>
        </TouchableOpacity>

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

export default Map;
