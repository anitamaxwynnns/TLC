import { SafeAreaView } from "react-native-safe-area-context";
import { getExercises } from "./db";
import { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

function ExerciseComponent({ exercise }: { exercise: any }) {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.bodyPart}>{exercise.muscle}</Text>
            </View>
        </View>
    );
}

export default function Home() {
    const [exercises, setExercises] = useState<any[]>();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredExercises, setFilteredExercises] = useState<any[]>();

    useEffect(() => {
        let ignore = false;
        getExercises().then((result) => {
            if (!ignore) {
                setExercises(result);
                setFilteredExercises(result)
            }
        });
        return () => {
            ignore = true;
        };
    }, []);

    useEffect(() => {
    const newData = exercises.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredExercises(newData)
    }, [searchQuery, exercises])

    return (
        <SafeAreaView>
            <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <FlatList
                data={exercises}
                renderItem={({ item }) => <ExerciseComponent exercise={item} />}
                keyExtractor={(item) => item.name}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        flex: 1,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    textContainer: {
        flexDirection: "column",
    },
    exerciseName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    bodyPart: {
        fontSize: 14,
    },
});
