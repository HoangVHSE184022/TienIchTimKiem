import React, { useState, useRef, useEffect } from 'react';
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

const Map = ({ navigation }) => {
  const [route, setRoute] = useState(null); // Add this line
  const [mapData, setMapData] = useState(null);
  const [mbtilesOpacity, setMbtilesOpacity] = useState(1);
  const [showMbtiles, setShowMbtiles] = useState(true);
  const [marker, setMarker] = useState(null); // State for marker
  const [showMarker, setShowMarker] = useState(true); // State to toggle marker visibility
  const [userLocation, setUserLocation] = useState(null); // State for user location
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef(null);
  const [tileError, setTileError] = useState(false);
  const [zoomLevels, setZoomLevels] = useState({ minZoom: 0, maxZoom: 23 });
  const [currentZoom, setCurrentZoom] = useState(0);
  const [centerCoordinate, setCenterCoordinate] = useState({ latitude: 0, longitude: 0 });
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    fetchZoomLevels();
    fetchInitialRegion();
  }, []);

  const fetchZoomLevels = async () => {
    try {
      const response = await axios.get('http://192.168.100.176:3000/zoom-levels');
      setZoomLevels(response.data);
    } catch (error) {
      console.error('Error fetching zoom levels:', error);
    }
  };

  const fetchInitialRegion = async () => {
    try {
      const response = await axios.get('http://192.168.100.176:3000/initial-region');
      setInitialRegion(response.data);
    } catch (error) {
      console.error('Error fetching initial region:', error);
      setInitialRegion({
        latitude: 18.053296,
        longitude: 106.294729,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

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
        setMarker({
          coordinate: { latitude, longitude },
          title: "My Location"
        });
  
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
    const { coordinate } = event.nativeEvent;
    if (marker && marker.latitude === coordinate.latitude && marker.longitude === coordinate.longitude) {
      setMarker(null); 
    } else {
      setMarker({
        coordinate, 
        title: `Lat: ${coordinate.latitude.toFixed(6)}, Lon: ${coordinate.longitude.toFixed(6)}` 
      });
    }
  };

  const toggleMarkerVisibility = () => { 
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

        setMarker({
          coordinate: searchLocation,
          title: searchQuery,
        });

        mapRef.current?.animateToRegion({
          ...searchLocation,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }, 1000);
      } else {
        console.log('Location not found');
      }
    } catch (error) {
      console.error('Error searching for location:', error);
    }
  };

  const handleNavigation = async () => {
    if (!userLocation || !marker) {
      alert('Please set both your location and a destination marker.');
      return;
    }

    try {
      const response = await axios.get(
        `http://router.project-osrm.org/route/v1/driving/${userLocation.longitude},${userLocation.latitude};${marker.coordinate.longitude},${marker.coordinate.latitude}?overview=full&geometries=polyline`
      );

      if (response.data && response.data.routes && response.data.routes.length > 0) {
        const routeGeometry = response.data.routes[0].geometry;
        const decodedRoute = polyline.decode(routeGeometry);

        setRoute(decodedRoute.map(point => ({
          latitude: point[0],
          longitude: point[1]
        })));

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

  const onRegionChangeComplete = (region) => {
    const zoom = Math.log2(360 * (region.longitudeDelta / 256)) * -1 + 1;
    setCurrentZoom(Math.round(zoom * 100) / 100); // Round to 2 decimal places

    setCenterCoordinate({
      latitude: region.latitude,
      longitude: region.longitude
    });
  };

  return (
    <ScreenLayout>  
      <View style={styles.container}>
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
          <Text style={styles.title}>Bản đồ</Text>
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

        <TouchableOpacity
          style={styles.locationButton}
          onPress={getUserLocation}
        >
          <Text style={styles.buttonText}>Lấy vị trí ca tôi</Text>
        </TouchableOpacity>

        {initialRegion && (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={initialRegion}
            minZoomLevel={zoomLevels.minZoom}
            maxZoomLevel={zoomLevels.maxZoom}
            onPress={handleMapPress}
            onRegionChangeComplete={onRegionChangeComplete}
          >
            {showMbtiles && (
              <UrlTile
                urlTemplate="http://192.168.100.176:3000/{z}/{x}/{y}.png"
                zIndex={1}
                opacity={mbtilesOpacity}
                tileSize={256}
                maximumZ={zoomLevels.maxZoom}
                minimumZ={zoomLevels.minZoom}
                onError={() => setTileError(true)}
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
            
            {route && (
              <Polyline
                coordinates={route}
                strokeColor="#4169E1"
                //strokeColor="#0000FF"
                strokeWidth={6}
              />
            )}
          </MapView>
        )}

        {tileError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error loading custom tiles. Falling back to OpenStreetMap.</Text>
          </View>
        )}

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

        {/* Display zoom levels */}
        <View style={styles.zoomInfoContainer}>
          <Text style={styles.zoomInfoText}>
            Min Zoom: {zoomLevels.minZoom}, Max Zoom: {zoomLevels.maxZoom}
          </Text>
        </View>

        {/* Display current zoom and center coordinate */}
        <View style={styles.mapInfoContainer}>
          <Text style={styles.mapInfoText}>
            Zoom: {currentZoom}
          </Text>
          <Text style={styles.mapInfoText}>
            Center: {centerCoordinate.latitude.toFixed(6)}, {centerCoordinate.longitude.toFixed(6)}
          </Text>
        </View>

      </View>
    </ScreenLayout>
  );
};

export default Map;
