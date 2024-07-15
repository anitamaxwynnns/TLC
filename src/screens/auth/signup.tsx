import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, TextInput } from 'react-native-paper';
import { supabase } from 'src/libs/database/supabase';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackNavigatorParamsList } from 'App';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [step, setStep] = useState(1);

  const navigation = useNavigation<StackNavigationProp<RootStackNavigatorParamsList>>();

  async function sendOTP(email) {
    const { data, error } = await supabase
      .rpc('send_otp', { email });

    if (error) {
      console.error('Error sending OTP:', error);
      return null;
    }

    console.log('Generated OTP:', data);

    return data;
  }

  async function handleSendOTP() {
    setLoading(true);
    const otp = await sendOTP(email);
    setGeneratedOtp(otp);
    setLoading(false);
    setStep(2);
  }

  async function handleVerifyOTP() {
    if (otp === generatedOtp) {
      handleSignUp();
    } else {
      Alert.alert('Invalid OTP. Please try again.');
    }
  }

  async function handleSignUp() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigation.navigate('Main', { email });
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ImageBackground source={require('assets/background.png')} style={styles.image} blurRadius={2}>
          <View>
            {step === 1 ? (
              <>
                <TextInput mode='outlined' value={name} onChangeText={text => setName(text)} secureTextEntry={false} placeholder='Name' autoCapitalize='none' activeOutlineColor='black' style={styles.textinput} />
                <TextInput mode='outlined' value={email} onChangeText={text => setEmail(text)} secureTextEntry={false} placeholder='Email' autoCapitalize='none' activeOutlineColor='black' style={styles.textinput2} />
                <TextInput mode='outlined' value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} placeholder='Password' autoCapitalize='none' activeOutlineColor='black' style={styles.textinput2} />
                <Button disabled={loading} mode='contained' theme={{ colors: { primary: 'black' } }} style={styles.button} onPress={handleSendOTP}>{'Submit'}</Button>
              </>
            ) : (
              <>
                <TextInput mode='outlined' value={otp} onChangeText={text => setOtp(text)} secureTextEntry={false} placeholder='Enter OTP' autoCapitalize='none' activeOutlineColor='black' style={styles.textinput2} />
                <Button disabled={loading} mode='contained' theme={{ colors: { primary: 'black' } }} style={styles.button} onPress={handleVerifyOTP}>{'Verify OTP'}</Button>
              </>
            )}
          </View>
        </ImageBackground>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput: {
    width: 300,
    marginBottom: 20,
  },
  textinput2: {
    width: 300,
    marginBottom: 20,
  },
  button: {
    width: 300,
  },
});
