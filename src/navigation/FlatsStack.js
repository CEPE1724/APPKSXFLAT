import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { MenuScreen } from "../screens/MenuScreen"; // Asegúrate de que la ruta sea correcta
import { FlatsScreen } from "../screens/Flats"; // Asegúrate de que la ruta sea correcta
import { ListFlats } from "../screens/ListFlats"; // Asegúrate de que la ruta sea correcta
import { FontAwesome } from "@expo/vector-icons"; // Importar FontAwesome desde @expo/vector-icons
import CustomMenu from "../component/CustomMenu"; // Importa el componente CustomMenu que creaste
import { Provider } from "react-native-paper";
import { TouchableOpacity, StyleSheet } from "react-native";
const Stack = createNativeStackNavigator();

export function FlatsStack() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <Provider>
      <Stack.Navigator>
        <Stack.Screen
          name={screen.flat.menuflats}
          component={MenuScreen}
          options={{
            title: "Flats",
            headerRight: () => (
              <TouchableOpacity onPress={toggleMenu} style={styles.iconContainer}>
                <FontAwesome name="user-circle" size={0} color="black" style={styles.icon} />
              </TouchableOpacity>
            ),
          }} // Aquí defines el título que debe mostrarse en la pantalla
        />

        <Stack.Screen
          name={screen.flat.flats}
          component={FlatsScreen}
          options={{ title: "Flats" }} // Aquí defines el título que debe mostrarse en la pantalla
          initialParams={{ type: "create" }}
        />
        <Stack.Screen
          name={screen.flat.listflats}
          component={ListFlats}
          options={{ title: "Flats" }} // Aquí defines el título que debe mostrarse en la pantalla
          initialParams={{ type: "list", userId: "" }}
        />
        <Stack.Screen
          name={screen.flat.updateflats}
          component={FlatsScreen}
          options={{ title: "Flats" }} // Aquí defines el título que debe mostrarse en la pantalla
          initialParams={{ type: "update", userId: "" }}
        />
        <Stack.Screen
          name={screen.flat.favoriteflats}
          component={ListFlats}
          options={{ title: "Favorite Flats" }} // Aquí defines el título que debe mostrarse en la pantalla
          initialParams={{ type: "favo", userId: "" }}
        />
      </Stack.Navigator>
     
    </Provider>
  );
}
// <CustomMenu menuVisible={menuVisible} toggleMenu={toggleMenu} />
const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
});

export default FlatsStack;
