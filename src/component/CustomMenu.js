import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, Menu } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../utils/screenName";

const CustomMenu = ({ menuVisible, toggleMenu }) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Limpiar datos del AsyncStorage
      await AsyncStorage.clear();
      console.log("Datos del almacenamiento local borrados correctamente.");

      // Navegar a la pantalla de inicio de sesión
      navigation.navigate(screen.auth.login);

      toggleMenu(); // Cierra el menú después de realizar la acción
    } catch (error) {
      console.error("Error al borrar datos del almacenamiento local:", error);
    }
  };

  return (
    <Menu
      visible={menuVisible}
      onDismiss={toggleMenu}
      anchor={<Button onPress={toggleMenu}></Button>}
      style={styles.menu}
    >
      <Menu.Item onPress={handleLogout} title={<Text>Salir</Text>} />
    </Menu>
  );
};

const styles = StyleSheet.create({
  menu: {
    marginTop: -580, // Ajusta según tus necesidades
    marginLeft: 270, // Ajusta según tus necesidades
    width: 100, // Ajusta según tus necesidades
  },
});

export default CustomMenu;
