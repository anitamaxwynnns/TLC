import React, { useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, Alert, AppState } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Button, TextInput } from 'react-native-paper'
import { supabase } from './supabase'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackNavigatorParamsList } from '../App'

AppState.addEventListener('change', (state) => {
  if (state == 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation<StackNavigationProp<RootStackNavigatorParamsList>>()
  async function SignUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password
    })
    setLoading(false)
    if (error) {
      Alert.alert(error.message)
      return
    }
    navigation.replace("Home")
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/background.png')} style={styles.image} blurRadius={2}>
          <TextInput mode='outlined' value={email} onChangeText={text => setEmail(text)} secureTextEntry={false} placeholder='Email' autoCapitalize='none' activeOutlineColor='black' style={styles.textinput} />
          <TextInput mode='outlined' value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} placeholder='Password' autoCapitalize='none' activeOutlineColor='black' style={styles.textinput2} />
          <Button disabled={loading} mode='contained' theme={{ colors: { primary: 'black' } }} style={styles.button} onPress={SignUpWithEmail}>{'Submit'}</Button>
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
