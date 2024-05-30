import React, { useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Button, TextInput } from 'react-native-paper'
import { supabase } from './supabase'

export default function Signup() {
  const [text, setText] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState('')
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/background.png')} style={styles.image} blurRadius={2}>
          <TextInput mode='outlined' label='Email Address' value={text} onChangeText={text => setText(text)} activeOutlineColor='black' style={styles.textinput} />
          <TextInput mode='outlined' label='Password' value={text} onChangeText={text => setText(text)} activeOutlineColor='black' style={styles.textinput2} />
          <Button mode='contained' theme={{ colors: { primary: 'black' } }} style={styles.button}>{'Submit'}</Button>
        </ImageBackground>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  textinput: {
    marginTop: 400,
    justifyContent: 'center',
    width: 300,
    marginRight: 20,
  },
  textinput2: {
    marginRight: 20,
    width: 300,
    marginTop: 30,
  },
  button: {
    marginTop: 30,
    marginRight: 15,
  }
})
