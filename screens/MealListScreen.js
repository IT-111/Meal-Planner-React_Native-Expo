import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function MealListScreen() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "meals"));
        const mealsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          meals: doc.data(),
        }));
        setMeals(mealsArray);
      } catch (error) {
        console.error("Error fetching meals: ", error);
      }
    };

    fetchMeals();
  }, []);

  const renderMealItem = (mealType, mealData) => (
    <View style={styles.item}>
      <Text style={styles.mealText}>{mealType}</Text>
      <Text>{mealData.meal} at {mealData.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Meals</Text>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.dateText}>{item.id}</Text>
            {renderMealItem("Breakfast", item.meals.breakfast)}
            {renderMealItem("Lunch", item.meals.lunch)}
            {renderMealItem("Dinner", item.meals.dinner)}
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
