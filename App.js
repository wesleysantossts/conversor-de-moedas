import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import tw from "twrnc";

import Picker from './src/components/Picker';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.areaMoeda}>
        <Text>Selecine sua moeda:</Text>
        <Picker/>
      </View>
      <View style={styles.areaValor}>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center"
  }
})