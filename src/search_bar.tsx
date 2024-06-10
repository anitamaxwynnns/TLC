import { View, ViewStyle } from "react-native"

type SearchBarProps {
value: string
style? : ViewStyle | ViewStyle[]
onChangeText: (text: string) => void
}
