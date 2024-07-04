import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native';
import { getExercises } from './db';
import { OPENAI_API_KEY } from '@env'; 
import axios from 'axios';

export default function AiWorkout({navigation}) {
  const [prompt, setPrompt] = useState('');
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWorkout = async () => {
    setLoading(true);
    try {
      const exercises = await getExercises();
      console.log('Exercises', exercises);
      const exerciseMuscleGroups = exercises.map(exercise => exercise.muscle).join(',');
      const exerciseNames = exercises.map(exercise => exercise.name).join(', ');

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          max_tokens: 100,
          messages: [
            { role: 'system', content: `Here is a list of exercises: ${exerciseNames}. 
              Create a workout plan using these exercises.
              Always generate the workout in this style
              1. Barbell Bench Press - 4 sets of 8-10 reps
              2. Cable Bench Press - 3 sets of 12-15 reps
              3. Band Bench Press - 3 sets of 12-15 reps
              4. Barbell Incline Bench Press - 4 sets of 8-10 reps
              5. Band One Arm Twisting Chest Press - 3 sets of 12-15 reps
              
              There can be more or less than 5 exercises based on the prompt but the general structure of the list should remain the same` },
            { role: 'user', content: prompt }
          ],
          n: 1,
          stop: null,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const generatedText = response.data.choices[0].message.content;
      const parsedExercises = parseGeneratedText(generatedText, exercises);

      navigation.navigate('AiWorkoutSubmission', { selectedExercises: parsedExercises });
    }  catch (error) {
      console.error("Error fetching exercises:", error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        Alert.alert('Error', `Unable to generate workout: ${error.response.data.error.message}`);
      } else if (error.request) {
        console.error('Request data:', error.request);
        Alert.alert('Error', 'No response received from the server');
      } else {
        console.error('Error message:', error.message);
        Alert.alert('Error', error.message);
      }
    }
    setLoading(false);
  };

  const parseGeneratedText = (text, exercises) => {
    const exercisesMap = new Map(exercises.map(exercise => [exercise.name, exercise.muscle]));
    const filteredExercises = text.split('\n').filter(line => /^\d+\./.test(line)).map((exercise, index) => {

      let namefront = exercise.split(' - ')[0];
      let name = namefront.trim();
      let muscle = exercisesMap.get(name) || 'Unknown Muscle Group';
      let reps = 'Unknown';
      let sets = 'Unknown';
  
      const setsRepsPattern = /(\d+)\s*sets?\s*(?:of)?\s*(\d+(?:-\d+)?|to failure)\s*reps?/i;
      const match = exercise.match(setsRepsPattern);
  
      if (match) {
        sets = match[1];
        reps = match[2];
      }
  
      return {
        name,
        muscle,
        reps,
        sets,
      };
    });
  
    return filteredExercises;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.placeholderText}>AI Generated Workout</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your prompt"
          value={prompt}
          onChangeText={setPrompt}
        />
        <TouchableOpacity style={styles.button} onPress={fetchWorkout}>
          <Text style={styles.buttonText}>Generate Workout</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}

      </View>
    </SafeAreaView>
  );
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
  content: {
    alignItems: 'center',
    width: '80%',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 30,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  workoutText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});
