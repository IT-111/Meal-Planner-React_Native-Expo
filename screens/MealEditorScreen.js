import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Picker } from "react-native";
import { db } from "../config/firebaseConfig"; 
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function MealEditorScreen({ route, navigation }) {
  const { mealDate } = route.params;
  
  // Initialize state for each meal and time
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [breakfastTime, setBreakfastTime] = useState("08:00 AM");
  const [lunchTime, setLunchTime] = useState("12:00 PM");
  const [dinnerTime, setDinnerTime] = useState("07:00 PM");

  useEffect(() => {
    if (mealDate) {
      // Fetch existing meal details for the specific day
      const loadMeal = async () => {
        const docRef = doc(db, "meals", mealDate);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBreakfast(data.breakfast.meal);
          setLunch(data.lunch.meal);
          setDinner(data.dinner.meal);
          setBreakfastTime(data.breakfast.time);
          setLunchTime(data.lunch.time);
          setDinnerTime(data.dinner.time);
        }
      };
      loadMeal();
    }
  }, [mealDate]);

  const saveMeals = async () => {
    try {
      await setDoc(doc(db, "meals", mealDate), {
        breakfast: {
          meal: breakfast,
          time: breakfastTime,
        },
        lunch: {
          meal: lunch,
          time: lunchTime,
        },
        dinner: {
          meal: dinner,
          time: dinnerTime,
        },
      });
      alert("Meals saved!");
      navigation.goBack(); // Go back to the previous screen
    } catch (error) {
      console.error("Error saving meals:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal for {mealDate}</Text>

      {/* Breakfast Meal */}
      <TextInput
        placeholder="Enter breakfast..."
        value={breakfast}
        onChangeText={setBreakfast}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter breakfast time..."
        value={breakfastTime}
        onChangeText={setBreakfastTime}
        style={styles.input}
      />

      {/* Lunch Meal */}
      <TextInput
        placeholder="Enter lunch..."
        value={lunch}
        onChangeText={setLunch}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter lunch time..."
        value={lunchTime}
        onChangeText={setLunchTime}
        style={styles.input}
      />

      {/* Dinner Meal */}
      <TextInput
        placeholder="Enter dinner..."
        value={dinner}
        onChangeText={setDinner}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter dinner time..."
        value={dinnerTime}
        onChangeText={setDinnerTime}
        style={styles.input}
      />

      <Button title="Save Meals" onPress={saveMeals} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  title: { fontSize: 20, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});
