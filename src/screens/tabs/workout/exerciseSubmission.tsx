import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { NavigationProp, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigatorParamsList } from './workout';

export default function ExerciseSubmission() {
  const route = useRoute();
  const { selectedExercises } = route.params;
  const navigation = useNavigation<NavigationProp<RootStackNavigatorParamsList>>();

  const GoHome = () => {
    Alert.alert(
      "Workout Submitted",
      "Your workout has been successfully submitted!",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate('workouthome')
        }
      ],
    );
  };

  const renderExercise = ({ item, index}: {item: any , index: number}) => (
    <View style={styles.exerciseItem}>
      <Text style={styles.exerciseText}>{index + 1}. {item.name}</Text>
      <Text style={styles.bodyPart}>{item.muscle}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selected Exercises</Text>
      <FlatList
        data={selectedExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.name}
      />
      <TouchableOpacity style={styles.button} onPress={GoHome}>
      <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 16,
    textAlign: 'center',
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
});
