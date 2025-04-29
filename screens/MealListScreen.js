import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { db } from "../config/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function MealListScreen({ navigation }) {
  const [meals, setMeals] = useState([]);

  // Function to fetch the meals from Firestore
  const fetchMeals = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "meals"));
      const mealsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        meals: doc.data(),
      }));
      setMeals(mealsArray); // Set the meals state to update the UI
    } catch (error) {
      console.error("Error fetching meals: ", error);
    }
  };

  // Fetch meals when the component mounts or when meals data is changed
  useEffect(() => {
    fetchMeals();
  }, []);

  // Handle the edit action
  const handleEdit = (mealDate) => {
    navigation.navigate("MealEditor", { mealDate, refreshMeals: fetchMeals });
  };

  // Handle the delete action
  const handleDelete = async (mealDate) => {
    try {
      await deleteDoc(doc(db, "meals", mealDate)); // Delete meal from Firestore
      alert("Meal deleted!");
      fetchMeals(); // Re-fetch meals after deleting
    } catch (error) {
      console.error("Error deleting meal: ", error);
    }
  };

  const renderMealItem = (mealType, mealData) => (
    <View style={styles.item}>
      <Text style={styles.mealText}>{mealType}</Text>
      <Text>{mealData.meal} at {mealData.time}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.dateText}>{item.id}</Text>
      {renderMealItem("Breakfast", item.meals.breakfast)}
      {renderMealItem("Lunch", item.meals.lunch)}
      {renderMealItem("Dinner", item.meals.dinner)}
      <Button title="Edit" onPress={() => handleEdit(item.id)} />
      <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Meals</Text>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
