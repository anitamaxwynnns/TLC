import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ImageBackground, StyleSheet, Alert, AppState } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Button, TextInput } from 'react-native-paper'
import { supabase } from './supabase'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackNavigatorParamsList } from '../App'

export default function Settings() {
    return(
        <SafeAreaView style={styles.container}>
        <View>
            <Text style={styles.placeholderText}>Settings</Text>
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