import { SafeAreaView } from "react-native-safe-area-context";
import { getExercises } from "./db";
import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Keyboard, SectionList } from "react-native";
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
    const [exercises, setExercises] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredExercises, setFilteredExercises] = useState<any[]>([]);

    useEffect(() => {
        let ignore = false;
        getExercises().then((result) => {
            if (!ignore) {
                setExercises(result);
                setFilteredExercises(result);
            }
        });
        return () => {
            ignore = true;
        };
    }, []);

    /*useEffect(() => {
        if (exercises !== undefined) {
            const newData = exercises.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()),
            );
            setFilteredExercises(newData);
        }
    }, [searchQuery, exercises]); */
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Exercises</Text>
            <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
                mode="bar"
                style={{
                    marginLeft: 15,
                    marginRight: 15,
                    backgroundColor: "white",
                    borderRadius: 10,
                    alignItems: "center",
                }}
            />
            <SectionList
                sections={filteredExercises}
                renderItem={({ item }) => <ExerciseComponent exercise={item} />}
                keyExtractor={(item, index) => item.name + index}
                renderSectionHeader={({ section }) => (
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            paddingLeft: 5,
                        }}
                    >
                        {section.title}
                    </Text>
                )}
                stickySectionHeadersEnabled={false}
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
        flex: 1,
    },
    exerciseName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    bodyPart: {
        fontSize: 14,
    },
    header: {
        fontWeight: "700",
        fontSize: 35,
        paddingLeft: 15,
    },
    container: {
        gap: 15,
        flex:1,
    },
});
