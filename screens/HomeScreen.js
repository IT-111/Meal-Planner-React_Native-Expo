import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🍽️ Meal Planner</Text>

      <NavButton
        icon="calendar-outline"
        label="Open Calendar"
        onPress={() => navigation.navigate("Calendar")}
      />
      <NavButton
        icon="settings-outline"
        label="Settings"
        onPress={() => navigation.navigate("Settings")}
      />
      <NavButton
        icon="restaurant-outline"
        label="View All Meals"
        onPress={() => navigation.navigate("MealList")}
      />
    </SafeAreaView>
  );
}

function NavButton({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#fff" />
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1fdf5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#2d6a4f",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#40916c",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 10,
    width: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "600",
  },
});
