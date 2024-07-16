import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { UserScreen } from "../screens/UserScreen/UserScreen";
import { MenuUser } from "../../src/screens/MenuUser";
import { ListUser } from "../../src/screens/ListUser";
const Stack = createNativeStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.user.menu}
        component={MenuUser}
        options={{ title: "Usuarios" }}
        initialParams={{ type: "edit", userId: "" }} // Pasando el parámetro 'type' como 'edit'
      />

      <Stack.Screen
        name={screen.user.accounts}
        component={UserScreen}
        options={{ title: "Cuenta" }}
        initialParams={{ type: "edit", userId: "" }} // Pasando el parámetro 'type' como 'edit'
      />

      <Stack.Screen
        name={screen.user.list}
        component={ListUser}
        options={{ title: "Lista" }}
      />
    </Stack.Navigator>
  );
}

export default AccountStack;
