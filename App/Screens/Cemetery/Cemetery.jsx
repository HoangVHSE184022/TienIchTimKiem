import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from './CemeteryStyles';

export default function Cemetery() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState('');

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setQrData(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          {scanned ? qrData : 'Scan a QR code to see the information here'}
        </Text>
        {scanned && (
          <Button
            title="Scan Again"
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    </View>
  );
}
