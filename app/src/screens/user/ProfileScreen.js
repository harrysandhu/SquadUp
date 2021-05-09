import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

export const Profile = () => {
  return (
    <View style={styles.center}>
      <Text>This is the profile screen</Text>
      <Button title="Go to About Screen" />
    </View>
  );
};