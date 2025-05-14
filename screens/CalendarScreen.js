import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Platform,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { db } from "../config/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import BottomNav from "../components/BottomNav";
import background from "../assets/image.png";

export default function CalendarScreen({ navigation }) {
  const [markedDates, setMarkedDates] = useState({});

  const fetchSavedMeals = async () => {
    const mealsRef = collection(db, "meals");
    const querySnapshot = await getDocs(mealsRef);
    const mealsData = {};

    querySnapshot.forEach((doc) => {
      const mealDate = doc.id;
      mealsData[mealDate] = {
        marked: true,
        dotColor: "#4CAF50",
        activeOpacity: 0.8,
      };
    });

    setMarkedDates(mealsData);
  };

  useFocusEffect(
    useCallback(() => {
      fetchSavedMeals();
    }, [])
  );

  const handleDayPress = (day) => {
    navigation.navigate("MealEditor", {
      mealDate: day.dateString,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={background}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
        resizeMode="cover"  // Moved to prop
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerText}>📅 Meal Planner Calendar</Text>
          </View>

          <View style={styles.container}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={markedDates}
              style={styles.calendar}
              theme={{
                backgroundColor: "transparent",
                calendarBackground: "transparent",
                textSectionTitleColor: "#2E3A59",
                selectedDayBackgroundColor: "#4CAF50",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#4CAF50",
                dayTextColor: "#333333",
                textDisabledColor: "#d9e1e8",
                dotColor: "#4CAF50",
                selectedDotColor: "#ffffff",
                arrowColor: "#4CAF50",
                monthTextColor: "#2E3A59",
                indicatorColor: "#4CAF50",
                textDayFontFamily: "System",
                textMonthFontFamily: "System",
                textDayHeaderFontFamily: "System",
                textDayFontWeight: "400",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "500",
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14,
              }}
            />
          </View>
        </View>

        <BottomNav current="Calendar" />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f4f7",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  backgroundImageStyle: {
    // Removed resizeMode from here, it's now a prop in ImageBackground
  },
  content: {
    flex: 1,
  },
  header: {
    paddingTop: 30,
    paddingBottom: 25,
    backgroundColor: "rgba(76, 175, 80, 0.9)",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    // Removed boxShadow (deprecated), use elevation
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1.5,
  },
  container: {
    flex: 1,
    marginTop: 50,
    margin: 20,
    marginBottom: 80,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    elevation: 6,
    // Removed boxShadow (deprecated), use elevation
    transform: [{ translateY: -10 }],
  },
  calendar: {
    borderRadius: 12,
    backgroundColor: "transparent",
    padding: 15,
    elevation: 5,
    // Removed boxShadow (deprecated), use elevation
  },
});
