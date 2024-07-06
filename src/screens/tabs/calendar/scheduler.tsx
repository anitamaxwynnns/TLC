import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, FlatList } from 'react-native';

type Events = {
  [key: string]: string[];
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function WeekScheduler() {
  const [events, setEvents] = useState<Events>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const handleAddEvent = (day: string) => {
    Alert.prompt(
      'New Event',
      `Enter event for ${day}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (event) => {
            if (event) {
              setEvents((prevEvents) => ({
                ...prevEvents,
                [day]: [...prevEvents[day], event],
              }));
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const renderEvent = (day: string) => {
    return (
      <View style={styles.dayContainer} key={day}>
        <Text style={styles.dayTitle}>{day}</Text>
        <Button title="Add Event" onPress={() => handleAddEvent(day)} />
        <FlatList
          data={events[day]}
          keyExtractor={(item, index) => `${day}-${index}`}
          renderItem={({ item }) => <Text style={styles.eventItem}>{item}</Text>}
          ListEmptyComponent={<Text style={styles.emptyDate}>No events for this day.</Text>}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {daysOfWeek.map((day) => renderEvent(day))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  dayContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  emptyDate: {
    fontSize: 16,
    marginVertical: 5,
    color: '#999',
  },
});

