import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function AiWorkoutSubmission() {
  const route = useRoute();
  const { selectedExercises } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    console.log('Selected Exercises', selectedExercises);
  }, [selectedExercises]);

  const GoHome = () => {
    Alert.alert(
      "Workout Submitted",
      "Your workout has been successfully submitted!",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate('Main')
        }
      ],
    );
  };

  const renderExercise = ({ item, index }) => (
    <View style={styles.exerciseItem}>
      <Text style={styles.exerciseText}> {item.name}</Text>
      <Text style={styles.bodyPart}>Muscle: {item.muscle}</Text>
      <Text style={styles.repsSets}>Sets: {item.sets}</Text>
      <Text style={styles.repsSets}>Reps: {item.reps}</Text>    
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
      <Text style={styles.header}>Selected Exercises</Text>
      <FlatList
        data={selectedExercises}
        renderItem={renderExercise}
        keyExtractor={(item, index) => index.toString()}
      />
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Start Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={GoHome}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 16,
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
    width: '80%',
  },
  workoutText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
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
  exerciseItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  exerciseText: {
    fontSize: 18,
  },
  bodyPart: {
    fontSize: 14,
    color: '#555',
  },
  repsSets: {
    fontSize: 16,
    color: '#333',
  },
});
