import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import BottomNav from "../components/BottomNav";
import background from "../assets/image.png"; // Make sure this path is correct

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleSwitch = () => setNotificationsEnabled((prev) => !prev);

  return (
    <ImageBackground
      source={background}
      style={styles.backgroundImage}
      imageStyle={styles.backgroundImageStyle}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>⚙️ Settings</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Meal Reminders</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleSwitch}
              thumbColor={notificationsEnabled ? "#4CAF50" : "#FF4081"}
              trackColor={{ false: "#BDBDBD", true: "#81C784" }}
              ios_backgroundColor="#BDBDBD"
            />
          </View>
        </ScrollView>

        <BottomNav current="Settings" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImageStyle: {
    resizeMode: "cover",
  },
  container: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 30,
    paddingBottom: 25,
    backgroundColor: "rgba(76, 175, 80, 0.9)",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.3)",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 10,
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 18,
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 12,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.15)",
  },
  settingLabel: {
    fontSize: 18,
    color: "#555",
    fontWeight: "600",
  },
});
