import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { db } from "../config/firebaseConfig";
import { collection, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import * as Notifications from "expo-notifications";
import BottomNav from "../components/BottomNav";
import background from "../assets/image.png";

// Notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function MealEditorScreen({ route, navigation }) {
  const { mealDate } = route.params;

  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [breakfastTime, setBreakfastTime] = useState("08:00 AM");
  const [lunchTime, setLunchTime] = useState("12:00 PM");
  const [dinnerTime, setDinnerTime] = useState("07:00 PM");

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to send notifications was denied");
      }
    };
    requestPermissions();
  }, []);

  useEffect(() => {
    const loadMeal = async () => {
      const docRef = doc(db, "meals", mealDate);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setBreakfast(data?.breakfast?.meal || "");
        setLunch(data?.lunch?.meal || "");
        setDinner(data?.dinner?.meal || "");
        setBreakfastTime(data?.breakfast?.time || "08:00 AM");
        setLunchTime(data?.lunch?.time || "12:00 PM");
        setDinnerTime(data?.dinner?.time || "07:00 PM");
      }
    };
    if (mealDate) loadMeal();
  }, [mealDate]);

  const saveMeals = async () => {
    try {
      const docRef = doc(db, "meals", mealDate);
      await setDoc(docRef, {
        breakfast: { meal: breakfast, time: breakfastTime },
        lunch: { meal: lunch, time: lunchTime },
        dinner: { meal: dinner, time: dinnerTime },
      });
      Alert.alert("Success", "Your meal(s) have been saved successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error saving meals:", error);
      Alert.alert("Error", "Failed to save meals. Please try again.");
    }
  };

  const deleteMeal = async () => {
    try {
      await deleteDoc(doc(db, "meals", mealDate));
      Alert.alert("Deleted", "Meal deleted!");
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  const formattedDate = new Date(mealDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
      <View style={styles.header}>
      <Text style={styles.title}>Meals for {formattedDate}</Text>
    </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
       

          <View style={styles.card}>
            <Text style={styles.label}>Breakfast</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter breakfast..."
              value={breakfast}
              onChangeText={setBreakfast}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Lunch</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter lunch..."
              value={lunch}
              onChangeText={setLunch}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Dinner</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter dinner..."
              value={dinner}
              onChangeText={setDinner}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={saveMeals}>
            <Text style={styles.saveText}>Save Meals</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={deleteMeal}>
            <Text style={styles.deleteText}>Delete Meal</Text>
          </TouchableOpacity>
        </ScrollView>

        <BottomNav current="MealList" />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    backgroundColor: "rgba(76, 175, 80, 0.9)",
    padding: 25,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginBottom: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    elevation: 5,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  deleteButton: {
    backgroundColor: "#f44336",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#f44336",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
