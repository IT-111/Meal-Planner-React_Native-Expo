import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// Function to format date to "Jan 1, 2025"
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function MealListScreen({ navigation }) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "meals"));
        const mealsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          meal: doc.data().meal,
          date: doc.data().date,
        }));
        setMeals(mealsArray);
      } catch (error) {
        console.error("Error fetching meals: ", error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Meals</Text>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.mealText}>{item.meal}</Text>
            <Text style={styles.dateText}>{formatDate(item.date)}</Text> {/* Format date */}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  title: { fontSize: 24, marginBottom: 20 },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  mealText: { fontSize: 18 },
  dateText: { fontSize: 14, color: "gray", marginTop: 5 },
});
