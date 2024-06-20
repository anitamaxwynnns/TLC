import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Alert,
    AppState,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, TextInput } from "react-native-paper";
import { supabase } from "./supabase";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackNavigatorParamsList } from "../App";

type Post = {
    id: string;
    image_url: string;
    caption: string;
    likes: number;
    profile: {
        name: string;
    };
};

export default function Forum() {}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    placeholderText: {
        fontSize: 30,
        fontWeight: "bold",
    },
});
