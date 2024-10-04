import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import Slider from '@react-native-community/slider';
import SwitchToggle from 'react-native-switch-toggle';
import Geolocation from 'react-native-geolocation-service'; // Import Geolocation
import axios from 'axios';
import styles from './MapStyles';
import ScreenLayout from '../ScreenLayout/ScreenLayout';
import { PermissionsAndroid, Platform } from 'react-native'; // Add Platform

const Map = ({ navigation }) => {
  const [mapData, setMapData] = useState(null);
  const [mbtilesOpacity, setMbtilesOpacity] = useState(1);
  const [showMbtiles, setShowMbtiles] = useState(true);
  const [marker, setMarker] = useState(null); // State for marker
  const [showMarker, setShowMarker] = useState(true); // State to toggle marker visibility
  const [userLocation, setUserLocation] = useState(null); // State for user location
  const mapRef = useRef(null);

  // Remove the useEffect hook that was calling getUserLocation

  const getUserLocation = async () => {
    try {
      let hasPermission = false;
      
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const result = await Geolocation.requestAuthorization('whenInUse');
        hasPermission = result === 'granted';
      }

      if (hasPermission) {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
            setMarker({
              coordinate: { latitude, longitude },
              title: "My Location"
            });
            mapRef.current.animateToRegion({
              latitude,
              longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }, 1000);
          },
          (error) => {
            console.error('Error getting location:', error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
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

  const goToUserLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 1000);
    } else {
      console.log("User location not available");
      // Optionally, you could call getUserLocation() here to request the location again
    }
  };

  return (
    <ScreenLayout>  
      <View style={styles.container}>
        <Text style={styles.title}>Bản đồ quận Ba Đình</Text>
        
        {/* New button to get user location */}
        <TouchableOpacity
          style={styles.locationButton}
          onPress={getUserLocation}
        >
          <Text style={styles.buttonText}>Get My Location</Text>
        </TouchableOpacity>

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
            // Remove any defaultProps that might be causing the warning
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
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 21.037457,
            longitude: 105.829991,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          minZoomLevel={0}
          maxZoomLevel={20} // Updated property
          onPress={handleMapPress} // Handle map press to set marker
        >

          {showMbtiles && (
            <UrlTile
              urlTemplate="http://192.168.1.14:3000/{z}/{x}/{y}.png"
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
          {userLocation && ( // Render user's current location
            <Marker
              coordinate={userLocation}
              title="My Location"
              pinColor="blue" // Change color for user location marker
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

        <TouchableOpacity
          style={[styles.buttonContainer, styles.locationButton]}
          onPress={goToUserLocation}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Go to My Location</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

export default Map;