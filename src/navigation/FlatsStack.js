import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { MenuScreen } from "../screens/MenuScreen"; // Asegúrate de que la ruta sea correcta
import { FlatsScreen } from "../screens/FlatsScreen"; // Asegúrate de que la ruta sea correcta
import { ListFlats } from "../screens/ListFlats"; // Asegúrate de que la ruta sea correcta
const Stack = createNativeStackNavigator();

export function FlatsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.flat.menuflats}
        component={MenuScreen}
        options={{ title: "Flats" }} // Aquí defines el título que debe mostrarse en la pantalla
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
      />
      <Stack.Screen
        name={screen.flat.updateflats}
        component={FlatsScreen}
        options={{ title: "Flats" }} // Aquí defines el título que debe mostrarse en la pantalla
        initialParams={{ type: "update", userId: ""}}
      />

    </Stack.Navigator>
  );
}

export default FlatsStack;
