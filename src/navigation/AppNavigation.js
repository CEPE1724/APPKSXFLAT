import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FlatsScreen } from "../screens/FlatsScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { UserScreen } from "../screens/UserScreen";
import { Icon } from "react-native-elements";
import React from "react";

const Tab = createBottomTabNavigator();

export function AppNavigation() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarAccessibilityLabel: "#00a680",
            tabBarActiveTintColor: "#00a680",
            tabBarIcon: ({ color, size }) =>
                screenOptions(route, color, size)
        })}
        >
            <Tab.Screen name="Flats" component={FlatsScreen} />
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="User" component={UserScreen} />
        </Tab.Navigator>
    );
}

function screenOptions(route, color, size) {
    let iconName;

    if (route.name === "Flats") {
        iconName = "home-outline";
    }

    if (route.name === "Login") {
        iconName = "account";
    }

    if (route.name === "User") {
        iconName = "account";
    }

    return (
        <Icon
            type="material-community"
            name={iconName}
            color={color}
            size={size}
        />
    );
}