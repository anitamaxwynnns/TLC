import { SafeAreaView } from "react-native-safe-area-context";
import { getExerciseGifUrl, getManyExercises } from "./db";
import { useState, useEffect, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    SectionList,
    TouchableOpacity,
    Modal,
    Pressable,
    Image,
    ScrollView,
} from "react-native";
import { Searchbar } from "react-native-paper";

type Exercise = {
    name: string;
    muscle: string;
    first_letter: string;
    gifUrl: string;
    instructions: string;
};

function ExerciseComponent({ exercise }: { exercise: Exercise }) {
    const gifUrl = getExerciseGifUrl(exercise.name);
    const [modalvisible, setModalvisible] = useState(false);
    const toggleModal = () => {
        setModalvisible((modalvisible) => !modalvisible);
    };
    return (
        <View>
            <TouchableOpacity onPress={toggleModal}>
                <View style={styles.itemContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.exerciseName}>{exercise.name}</Text>
                        <Text style={styles.bodyPart}>{exercise.muscle}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalvisible}
                onRequestClose={toggleModal}
            >
                <View
                    style={{
                        backgroundColor: "rgba(52, 52, 52, 0.8)",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 20,
                        paddingTop: 70,
                        paddingBottom: 80,
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "white",
                            borderRadius: 20,
                            width: "100%",
                            height: "100%",
                            padding: 30,
                            alignItems: "center",
                            gap: 30,
                        }}
                    >
                        <View style={{ width: "100%" }}>
                            <Pressable onPress={toggleModal}>
                                <Text>Back</Text>
                            </Pressable>
                        </View>
                        <Image
                            source={{ uri: gifUrl }}
                            style={{
                                width: "100%",
                                height: 300,
                            }}
                        />
                        <ScrollView
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <View
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    gap: 20,
                                }}
                            >
                                {exercise.instructions
                                    .split("\n")
                                    .map((instruction, idx) => (
                                        <Text
                                            key={idx}
                                            style={{
                                                fontSize: 18,
                                            }}
                                        >
                                            {instruction}
                                        </Text>
                                    ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default function Home() {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        let ignore = false;
        getManyExercises().then((result) => {
            if (!ignore) {
                setExercises(result);
            }
        });
        return () => {
            ignore = true;
        };
    }, []);

    const filteredSections = useMemo(() => {
        const filteredExercises = exercises.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        const sectionMap = new Map<string, Exercise[]>();
        for (const exercise of filteredExercises) {
            const sectionExercises =
                sectionMap.get(exercise.first_letter) ?? [];
            sectionMap.set(exercise.first_letter, [
                exercise,
                ...sectionExercises,
            ]);
        }
        return Array.from(sectionMap.entries())
            .map((section) => ({
                title: section[0],
                data: section[1].sort((a, b) => a.name.localeCompare(b.name)),
            }))
            .sort((a, b) => a.title.localeCompare(b.title));
    }, [exercises, searchQuery]);

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
                sections={filteredSections}
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
        flex: 1,
    },
});
