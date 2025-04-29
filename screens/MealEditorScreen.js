import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { db } from "../config/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function MealEditorScreen({ route, navigation }) {
  const { mealId, mealName, mealDate, refreshMeals } = route.params; // Get refreshMeals callback
  const [meal, setMeal] = useState(mealName || "");
  
  useEffect(() => {
    // If mealId exists, fetch the existing meal details
    if (mealId) {
      const loadMeal = async () => {
        const docRef = doc(db, "meals", mealId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMeal(docSnap.data().meal);
        }
      };
      loadMeal();
    }
  }, [mealId]);

  const saveMeal = async () => {
    // Save the meal using mealId or mealDate as document ID
    const idToSave = mealId || mealDate;
    try {
      await setDoc(doc(db, "meals", idToSave), {
        meal,
        date: mealDate,
      });
      alert("Meal saved!");
      refreshMeals(); // Refresh the meals list after saving
      navigation.goBack(); // Go back to the previous screen
    } catch (error) {
      console.error("Error saving meal:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal for {mealDate}</Text>
      <TextInput
        placeholder="Enter meal..."
        value={meal}
        onChangeText={setMeal}
        style={styles.input}
      />
      <Button title="Save Meal" onPress={saveMeal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  title: { fontSize: 20, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20 },
});
