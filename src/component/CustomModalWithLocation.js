import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const CustomModalWithLocation = ({ visible, onClose, latitude, longitude }) => {
  const [selectedLocation, setSelectedLocation] = useState(null); // Estado para la ubicación seleccionada
  const [mapRegion, setMapRegion] = useState(null); // Estado para la región inicial del mapa
 console.log("latitude", latitude);
  console.log("longitude", longitude);
  // Efecto para centrar el mapa en la ubicación proporcionada
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Verificar si se proporcionan coordenadas válidas
        if (latitude && longitude) {
          const fetchedLatitude = parseFloat(latitude); // Convertir a número
          const fetchedLongitude = parseFloat(longitude); // Convertir a número

          const address = await Location.reverseGeocodeAsync({ latitude: fetchedLatitude, longitude: fetchedLongitude });

          const newRegion = {
            latitude: fetchedLatitude,
            longitude: fetchedLongitude,
            latitudeDelta: 0.05, // Ajustar el valor delta según el zoom deseado
            longitudeDelta: 0.05,
          };

          setSelectedLocation({
            latitude: fetchedLatitude,
            longitude: fetchedLongitude,
            address: formatAddress(address),
          });

          setMapRegion(newRegion); // Actualizar la región inicial del mapa
        }
      } catch (error) {
        console.error('Error al obtener la ubicación:', error);
      }
    };

    // Solo ejecutar fetchLocation si se proporcionan latitude y longitude válidas
    if (visible && latitude && longitude) {
      fetchLocation();
    }
  }, [visible, latitude, longitude]);

  // Función para dar formato a la dirección completa
  const formatAddress = (addressComponents) => {
    const { name, street, city, region, country } = addressComponents[0];
    return `${name} ${street}, ${city}, ${region}, ${country}`;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={mapRegion}
          >
            {selectedLocation && (
              <Marker
                coordinate={{
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                }}
                title="Ubicación seleccionada"
                description={selectedLocation.address}
              />
            )}
          </MapView>
          <View style={styles.locationDetails}>
            {selectedLocation && (
              <>
                <Text>Latitud: {selectedLocation.latitude}</Text>
                <Text>Longitud: {selectedLocation.longitude}</Text>
                <Text>Dirección: {selectedLocation.address}</Text>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '90%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '70%',
    marginBottom: 10,
    borderRadius: 10,
  },
  locationDetails: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: 'black',
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomModalWithLocation;
