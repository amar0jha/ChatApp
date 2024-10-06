import React, { useEffect } from "react";
import { ImageBackground, View } from "react-native";
import { NavigationProp } from '@react-navigation/native';
import styles from "./styles";
import { Images } from "../../assets/images";

interface SplashProps {
  navigation: NavigationProp<any>;
}

const SplashScreen = ({ navigation }:SplashProps) => {
  
  const handleNav = () => {
    navigation.navigate('BottomTab');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNav();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.tutorial3} style={styles.appBg}>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;
