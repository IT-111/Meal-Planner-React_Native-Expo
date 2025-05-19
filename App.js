import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import CalendarScreen from "./screens/CalendarScreen";
import MealEditorScreen from "./screens/MealEditorScreen";
import SettingsScreen from "./screens/SettingsScreen";
import MealListScreen from "./screens/MealListScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen
          name="MealEditor"
          component={MealEditorScreen}
          options={{ title: "Edit Meal" }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen} // Corrected here
          options={{ title: "Settings" }}
        />
        <Stack.Screen
          name="MealList"
          component={MealListScreen}
          options={{ title: "All Meals" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}