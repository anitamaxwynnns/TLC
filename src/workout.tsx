import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ImageBackground, StyleSheet, Alert, AppState } from 'react-native'

export default function Workout() {
    return(
        <SafeAreaView style={styles.container}>
        <View>
            <Text style={styles.placeholderText}>Workout</Text>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeholderText: {
      fontSize: 30,
      fontWeight: 'bold',
    },
  });
