import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

export const Search = () => {
  return (
    <View style={styles.center}>
      <Text>This is the Search screen</Text>
      <Button title="Go to About Screen" />
    </View>
  );
};