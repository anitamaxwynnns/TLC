import { supabase } from "./supabase";

export async function getExercises() {
    const { data, error } = await supabase
        .from("exercise_table")
        .select("name,muscle,first_letter, gifUrl,instructions");

    console.log(data);

    if (error) {
        console.error(error);
        return [];
    }
    interface Exercise {
        name: string;
        muscle: string;
        first_letter: string;
    }
    interface Section {
        title: string;
        data: Exercise[];
    }
    const sections = data.reduce<Section[]>((accumulator, current) => {
        const firstLetter = current.first_letter;
        let section = accumulator.find((s) => s.title === firstLetter);
        if (!section) {
            section = { title: firstLetter, data: [] };
            accumulator.push(section);
        }
        section.data.push(current);
        return accumulator;
    }, [] as Section[]);
    sections.sort((a, b) => a.title.localeCompare(b.title));
    return sections;
}
