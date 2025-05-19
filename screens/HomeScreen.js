import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import BottomNav from "../components/BottomNav";
import background from "../assets/image.png";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={background}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Meal Planner</Text>
          </View>

          <View style={styles.dashboardContainer}>
            <View style={styles.column}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("Calendar")}
              >
                <Icon name="calendar-today" size={24} color="#fff" style={styles.cardIcon} />
                <Text style={styles.cardTitle}>Open Calendar</Text>
                <Text style={styles.cardDescription}>Plan your meals</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("Settings")}
              >
                <Icon name="settings" size={24} color="#fff" style={styles.cardIcon} />
                <Text style={styles.cardTitle}>Settings</Text>
                <Text style={styles.cardDescription}>Manage your preferences</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("MealList")}
              >
                <Icon name="restaurant-menu" size={24} color="#fff" style={styles.cardIcon} />
                <Text style={styles.cardTitle}>View All Meals</Text>
                <Text style={styles.cardDescription}>Browse meal options</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Fixed Bottom Navigation */}
        <View style={styles.bottomNavWrapper}>
          <BottomNav current="Home" navigation={navigation} />
        </View>
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
  },
  backgroundImageStyle: {
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    paddingBottom: 80, // space for BottomNav
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
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
  },
  dashboardContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
  },
  column: {
    width: "100%",
  },
  card: {
    backgroundColor: "#4CAF50",
    paddingVertical: 25,
    paddingHorizontal: 30,
    width: "100%",
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#388E3C",
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 16,
    fontWeight: "400",
    color: "#fff",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 22,
  },
  bottomNavWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
