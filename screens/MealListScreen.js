import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { db } from "../config/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import BottomNav from "../components/BottomNav";
import Icon from "react-native-vector-icons/Ionicons";
import background from "../assets/image.png"; // Add the background image

export default function MealListScreen({ navigation }) {
  const [meals, setMeals] = useState([]);

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

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleEdit = (mealDate) => {
    navigation.navigate("MealEditor", { mealDate, refreshMeals: fetchMeals });
  };

  const handleDelete = async (mealDate) => {
    try {
      await deleteDoc(doc(db, "meals", mealDate));
      alert("Meal deleted!");
      fetchMeals();
    } catch (error) {
      console.error("Error deleting meal: ", error);
    }
  };

  const renderMealItem = (mealType, mealData) => (
    <View style={styles.mealRow}>
      <Text style={styles.mealLabel}>{mealType}</Text>
      <Text style={styles.mealDetail}>
        {mealData?.meal || "-"} @ {mealData?.time || "-"}
      </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.dateText}>{item.id}</Text>
      {renderMealItem("🍳 Breakfast", item.meals.breakfast)}
      {renderMealItem("🍱 Lunch", item.meals.lunch)}
      {renderMealItem("🍽️ Dinner", item.meals.dinner)}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => handleEdit(item.id)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={background} // Set background image here
      style={styles.backgroundImage} // Add style to cover the entire screen
    >
      <View style={styles.container}>
        {/* Green Header */}
        <View style={styles.header}>
          <Text style={styles.title}>📋 Saved Meals</Text>
        </View>

        <FlatList
          data={meals}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />

        {/* Floating Add Button - Redirects to Calendar */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("Calendar")}
        >
          <Icon name="calendar" size={28} color="#fff" />
        </TouchableOpacity>

        <BottomNav current="MealList" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center", // Center content
  },
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 30,
    paddingBottom: 25,
    backgroundColor: "rgba(76, 175, 80, 0.9)", // Green with transparency
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5, // Elevation for Android shadow
    shadowColor: "#000", // Shadow properties for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  listContent: {
    paddingBottom: 100,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 5,
    borderLeftColor: "#4CAF50",
    elevation: 5, // Elevation for Android shadow
    shadowColor: "#000", // Shadow properties for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#444",
    marginBottom: 10,
  },
  mealRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  mealLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  mealDetail: {
    fontSize: 15,
    color: "#555",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  fab: {
    position: "absolute",
    bottom: 70,
    right: 20,
    backgroundColor: "#4CAF50",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8, // Elevation for Android shadow
    shadowColor: "#000", // Shadow properties for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
