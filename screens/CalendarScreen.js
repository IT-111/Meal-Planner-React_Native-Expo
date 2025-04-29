import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { db } from "../config/firebaseConfig";  // Firebase config
import { getDocs, collection } from "firebase/firestore";

export default function CalendarScreen({ navigation }) {
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const fetchSavedMeals = async () => {
      const mealsRef = collection(db, "meals");
      const querySnapshot = await getDocs(mealsRef);
      const mealsData = {};
      
      querySnapshot.forEach((doc) => {
        const mealDate = doc.id;
        mealsData[mealDate] = {
          marked: true,
          selectedColor: 'green', // You can change the color here
          selectedTextColor: 'white', // You can change the text color here
        };
      });

      setMarkedDates(mealsData);
    };

    fetchSavedMeals();
  }, []);  // Empty dependency array ensures this runs once on component mount

  const handleDayPress = (day) => {
    // Ensure mealId or mealDate is passed correctly
    navigation.navigate("MealEditor", { mealDate: day.dateString });
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        style={styles.calendar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  calendar: { borderRadius: 10, margin: 10 },
});
