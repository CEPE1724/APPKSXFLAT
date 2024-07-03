import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { UserScreen } from "../screens/UserScreen";

const Stack = createNativeStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.user.accounts}
        component={UserScreen}
        options={{ title: "Cuenta" }}
        initialParams={{ type: "edit" }} // Pasando el parámetro 'type' como 'edit'
      />
    </Stack.Navigator>
  );
}

export default AccountStack;
