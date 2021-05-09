import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

export const Chat = () => {
  return (
    <View style={styles.center}>
      <Text>This is the chat screen</Text>
      <Button title="Go to About Screen" />
    </View>
  );
};