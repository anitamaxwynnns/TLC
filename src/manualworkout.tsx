import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { getExercises } from "./db";
import { useNavigation } from '@react-navigation/native';
import ExerciseSubmissionPage from "./exerciseSubmission";


export default function ManualWorkout() {
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const navigation = useNavigation();

    const HandleExerciseSubmission = () => {
      navigation.navigate('ExerciseSubmission', {selectedExercises});
    };
  
    useEffect(() => {
      let ignore = false;
      getExercises().then(result => {
        if (!ignore) {
          setExercises(result);
        }
      });
      return () => {
        ignore = true;
      };
    }, []);
  
    const handleSelectExercise = (exercise) => {
      if (selectedExercises.includes(exercise)) {
        setSelectedExercises(selectedExercises.filter(item => item !== exercise));
      } else {
        setSelectedExercises([...selectedExercises, exercise]);
      }
    };
  
    const renderExercise = ({ item }) => (
      <TouchableOpacity
        style={[
          styles.exerciseItem,
          selectedExercises.includes(item) && styles.selectedExerciseItem
        ]}
        onPress={() => handleSelectExercise(item)}
      >
        <Text style={styles.exerciseText}>{item.name}</Text>
        <Text style={styles.bodyPart}>{item.muscle}</Text>
      </TouchableOpacity>
    );
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Select Exercises</Text>
        <FlatList
          data={exercises}
          renderItem={renderExercise}
          keyExtractor={(item) => item.name}
        />
        {selectedExercises.length > 0 && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedHeader}>Selected Exercises</Text>
          <ScrollView style={styles.scrollView}>
            {selectedExercises.map((exercise) => (
              <View key={exercise.name} style={styles.selectedExerciseItem}>
                <Text style={styles.exerciseText}>{exercise.name}</Text>
                <Text style={styles.bodyPart}>{exercise.muscle}</Text>
            </View>
          ))}
          </ScrollView>
          <TouchableOpacity style={styles.button} onPress={HandleExerciseSubmission}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
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
    selectedExerciseItem: {
      backgroundColor: '#cce5ff',
      borderColor: '#0056b3',
    },
    exerciseText: {
      fontSize: 18,
    },
    selectedContainer: {
      maxHeight: 200,
    },
    bodyPart: {
      fontSize: 14,
      color: '#555',
    },
  });