import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, UrlTile, Polyline } from 'react-native-maps';
import Slider from '@react-native-community/slider';
import SwitchToggle from 'react-native-switch-toggle';
import Geolocation from 'react-native-geolocation-service'; // Import Geolocation
import axios from 'axios';
import styles from './MapStyles';
import ScreenLayout from '../ScreenLayout/ScreenLayout';
import { PermissionsAndroid, Platform } from 'react-native'; // Add Platform
import * as Location from 'expo-location';
import { TextInput } from 'react-native';
import polyline from '@mapbox/polyline'; // Add polyline import
import { getDistance } from 'geolib'; // Add this import

const Map = ({ navigation }) => {
  const [route, setRoute] = useState(null); // Add this line
  const [mapData, setMapData] = useState(null);
  const [mbtilesOpacity, setMbtilesOpacity] = useState(1);
  const [showMbtiles, setShowMbtiles] = useState(true);
  const [markers, setMarkers] = useState([]); // Replace [marker, setMarker] with this
  const [distance, setDistance] = useState(null); // Add this state
  const [userLocation, setUserLocation] = useState(null); // State for user location
  const [searchQuery, setSearchQuery] = useState('');
  const [showMarker, setShowMarker] = useState(true); // Add this line
  const mapRef = useRef(null);

  const getUserLocation = async () => {
    try {
      let hasPermission = false;
      
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        hasPermission = status === 'granted';
      }
  
      if (hasPermission) {
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High, 
          timeout: 12000,                   
          maximumAge: 10000                
        });
  
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setMarkers([{
          coordinate: { latitude, longitude },
          title: "My Location"
        }]);
  
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }, 1000);
        }
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn("Error getting location: ", err);
    }
  };

  const handleMapPress = (event) => { 
    if (!showMarker) return; // Don't add markers if showMarker is false
    
    const { coordinate } = event.nativeEvent;
    if (markers.length < 2) {
      setMarkers([...markers, {
        coordinate,
        title: `Marker ${markers.length + 1}`
      }]);
    } else {
      // Reset markers if we already have two
      setMarkers([{
        coordinate,
        title: 'Marker 1'
      }]);
    }

    // Calculate distance if we have two markers
    if (markers.length === 1) {
      const dist = getDistance(
        { latitude: markers[0].coordinate.latitude, longitude: markers[0].coordinate.longitude },
        { latitude: coordinate.latitude, longitude: coordinate.longitude }
      );
      setDistance(dist);
    } else {
      setDistance(null);
    }
  };

  const toggleMarkerVisibility = () => { 
    setShowMarker(!showMarker);
    if (showMarker) { // This was inverted, so we fixed it
      setMarkers([]);
      setDistance(null);
    }
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
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const searchLocation = {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        };

        setMarkers([{
          coordinate: searchLocation,
          title: searchQuery,
        }]);

        mapRef.current?.animateToRegion({
          ...searchLocation,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }, 1000);
      } else {
        console.log('Location not found');
        // You might want to show an alert to the user here
      }
    } catch (error) {
      console.error('Error searching for location:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleNavigation = async () => {
    if (!userLocation || !markers.length) {
      alert('Please set both your location and a destination marker.');
      return;
    }

    try {
      const response = await axios.get(
        `http://router.project-osrm.org/route/v1/driving/${userLocation.longitude},${userLocation.latitude};${markers[0].coordinate.longitude},${markers[0].coordinate.latitude}?overview=full&geometries=polyline`
      );

      if (response.data && response.data.routes && response.data.routes.length > 0) {
        const routeGeometry = response.data.routes[0].geometry;
        const decodedRoute = polyline.decode(routeGeometry);

        setRoute(decodedRoute.map(point => ({
          latitude: point[0],
          longitude: point[1]
        })));

        // Fit the map to show the entire route
        mapRef.current?.fitToCoordinates(decodedRoute.map(point => ({
          latitude: point[0],
          longitude: point[1]
        })), {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      } else {
        alert('No route found.');
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      alert('Error fetching route. Please try again.');
    }
  };


  return (
    <ScreenLayout>  
      <View style={styles.container}>
        {/* Add the search bar near the top of the component */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a location"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>

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
          <TouchableOpacity style={styles.danDuongButton} onPress={handleNavigation}>
            <Text style={styles.danDuongButtonText}>Dẫn đường</Text>
          </TouchableOpacity>
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

          {/* New button to get user location */}
        <TouchableOpacity
          style={styles.locationButton}
          onPress={getUserLocation}
        >
          <Text style={styles.buttonText}>Lấy vị trí của tôi</Text>
        </TouchableOpacity>

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

          {showMarker && markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
            />
          ))}

          {userLocation && ( // Render user's current location
            <Marker
              coordinate={userLocation}
              title="My Location"
              pinColor="blue" // Change color for user location marker
            />
          )}
          
          {route && (
            <Polyline
              coordinates={route}
              strokeColor="#4169E1"
              //strokeColor="#0000FF"
              strokeWidth={6}
            />
          )}
        </MapView>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={toggleMarkerVisibility}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>{showMarker ? 'Hide Markers' : 'Show Markers'}</Text>
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

        {distance !== null && (
          <View style={styles.distanceContainer}>
            <Text style={styles.distanceText}>Distance: {distance} meters</Text>
          </View>
        )}

        {/* ... rest of your existing JSX ... */}
      </View>
    </ScreenLayout>
  );
};

export default Map;