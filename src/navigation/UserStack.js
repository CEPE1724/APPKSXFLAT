import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { UserScreen } from "../screens/UserScreen/UserScreen";
import { MenuUser } from "../../src/screens/MenuUser";
import { UserList } from "../screens/UserList";
import { FontAwesome } from "@expo/vector-icons"; // Importar FontAwesome desde @expo/vector-icons
import CustomMenu from "../component/CustomMenu"; // Importa el componente CustomMenu que creaste
import { Provider } from "react-native-paper";
const Stack = createNativeStackNavigator();

export function AccountStack() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <Provider>
    <Stack.Navigator>
      <Stack.Screen
        name={screen.user.menu}
        component={MenuUser}
        options={{
          title: "Usuario",
          headerRight: () => (
            <TouchableOpacity onPress={toggleMenu} style={styles.iconContainer}>
                <FontAwesome name="user-circle" size={24} color="black" style={styles.icon} />
              </TouchableOpacity>
          ),
        }}
        initialParams={{ type: "edit", userId: "" }} // Pasando el parámetro 'type' como 'edit'
      />

      <Stack.Screen
        name={screen.user.accounts}
        component={UserScreen}
        options={{ title: "Cuenta" }}
        initialParams={{ type: "edit", userId: "" }} // Pasando el parámetro 'type' como 'edit'
      />

      <Stack.Screen
        name={screen.user.userlist}
        component={UserList}
        options={{ title: "ListaUsuario" }}
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
export default AccountStack;
