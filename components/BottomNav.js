// components/BottomNav.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function BottomNav({ current }) {
  const navigation = useNavigation();

  const navItems = [
    { name: "Home", icon: "home" },
    { name: "Calendar", icon: "calendar" },
    { name: "MealList", icon: "list" },
    { name: "Settings", icon: "settings" },
  ];

  return (
    <View style={styles.navbar}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.navItem}
          onPress={() => navigation.navigate(item.name)}
        >
          <Icon
            name={item.icon}
            size={24}
            color={current === item.name ? "#4CAF50" : "#777"}
          />
          <Text
            style={[
              styles.navText,
              current === item.name && styles.activeText,
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingBottom: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    boxShadow: "0px -2px 10px rgba(0,0,0,0.1)",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  activeText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});
