import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Planner</Text>
      <Button
        title="Open Calendar"
        onPress={() => navigation.navigate("Calendar")}
      />
      <Button
        title="Settings"
        onPress={() => navigation.navigate("Settings")}
      />
      <Button
        title="View All Meals"
        onPress={() => navigation.navigate("MealList")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
