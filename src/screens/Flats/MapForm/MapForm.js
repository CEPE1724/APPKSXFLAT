import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Modal } from "../../../component/Modal"; // Asegúrate de que la ruta de importación sea correcta
import * as Location from 'expo-location';
import MapView from "react-native-maps";
import Toast from "react-native-toast-message";

export function MapForm(props) {
  const { show, close, formik } = props;
  const [location, setLocation] = useState({
    latitude: 0.001,
    longitude: 0.001,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Toast.show({
          type: "info",
          position: "bottom",
          text1: "Tienes que ir a ajustes de la app y activar la localización",
        });
        return;
      }

      const locationTemp = await Location.getCurrentPositionAsync({});

      setLocation({
        latitude: locationTemp.coords.latitude,
        longitude: locationTemp.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    })();
  }, []);

  const saveLocation = () => {
    formik.setFieldValue("location", location);
    close();
  };

  return (
    <Modal show={show} close={close}>
      <MapView
        initialRegion={location}
        showsUserLocation={true}
        style={styles.mapStyle}
        onRegionChange={(locationTemp) => setLocation(locationTemp)}
      >
        <MapView.Marker draggable coordinate={location} />
      </MapView>

      <View style={styles.mapActions}>
        <Button
          title="Guardar"
          containerStyle={styles.btnMapContainerSave}
          buttonStyle={styles.btnMapSave}
          onPress={saveLocation}
        />
        <Button
          title="Cerrar"
          containerStyle={styles.btnMapContainerCancel}
          buttonStyle={styles.btnMapCancel}
          onPress={close}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    width: "100%",
    height: 550,
  },
  mapActions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  btnMapContainerSave: {
    paddingRight: 5,
    width: "50%",
  },
  btnMapSave: {
    backgroundColor: "#00a680",
  },
  btnMapContainerCancel: {
    paddingLeft: 5,
    width: "50%",
  },
  btnMapCancel: {
    backgroundColor: "#a60d0d",
  },
});

export default MapForm;
