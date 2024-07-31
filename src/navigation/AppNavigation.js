import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FlatsStack } from "../navigation/FlatsStack";
import { MessageStack } from "../navigation/MessageStack";
import { LoginScreen } from "../screens/Login";
import { AccountStack } from "../navigation/UserStack";
import { screen } from "../utils";
import { SignUpScreen } from "../screens/SingUpScreen";
import { Icon } from "react-native-elements";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#00a680",
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
      })}
    >
      <Tab.Screen name={screen.flat.tab} component={FlatsStack} />
      <Tab.Screen name={screen.user.tab} component={AccountStack} />
      <Tab.Screen name={screen.message.tab} component={MessageStack} />
      <Tab.Screen
        name={screen.auth.login}
        component={LoginScreen}
        options={{ tabBarStyle: { display: 'none' } }}
      />
    </Tab.Navigator>
  );
}

function screenOptions(route, color, size) {
  let iconName;

  if (route.name === screen.flat.tab) {
    iconName = "home-outline";
  }

  if (route.name === screen.user.tab) {
    iconName = "account";
  }

  if (route.name === screen.message.tab) {
    iconName = "email";
  }
  if (route.name === screen.auth.login) {
    iconName = "login";
  }

  return (
    <Icon type="material-community" name={iconName} color={color} size={size} />
  );
}

export function AppNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="MainTabs" component={MainTabs} />
        ) : (
          <>
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
              )}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {(props) => <SignUpScreen {...props} />}
            </Stack.Screen>
           

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
