import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { MessageScreen } from "../screens/Message";
import { ViewMessageScreen } from "../screens/ViewMessageScreen";
import { API_URLS } from "../config/apiConfig";

const Stack = createNativeStackNavigator();

export function MessageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.message.list}
        component={MessageScreen}
        options={{ title: "Message List" }}
      />
      <Stack.Screen
        name={screen.message.view}
        component={ViewMessageScreen}
        options={{ title: "View Message" }}
        initialParams={{
          idUsuarioRecibe: "",
          idUsuarioEnvia: "",
          idflat: "",
        }}
      />
    </Stack.Navigator>
  );
}

export default MessageStack;
