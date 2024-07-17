import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons"; // Importa FontAwesome desde @expo/vector-icons
import { Provider } from "react-native-paper"; // Importa Provider desde react-native-paper
import { screen } from "../utils";
import { MessageScreen } from "../screens/Message";
import { ViewMessageScreen } from "../screens/ViewMessageScreen";
import CustomMenu from "../component/CustomMenu"; // Importa el componente CustomMenu que creaste
import { API_URLS } from "../config/apiConfig";

const Stack = createNativeStackNavigator();

export function MessageStack() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <Provider>
      <Stack.Navigator>
        <Stack.Screen
          name={screen.message.list}
          component={MessageScreen}
          options={{
            title: "Message List",
            headerRight: () => (
              <TouchableOpacity onPress={toggleMenu} style={styles.iconContainer}>
                <FontAwesome name="user-circle" size={24} color="black" style={styles.icon} />
              </TouchableOpacity>
            ),
          }}
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
      <CustomMenu menuVisible={menuVisible} toggleMenu={toggleMenu} />
    </Provider>
  );
}

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

export default MessageStack;
