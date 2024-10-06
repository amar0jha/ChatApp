import React from "react";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.textTitle}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;
