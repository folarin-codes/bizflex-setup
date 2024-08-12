import { StyleSheet } from "react-native"
import { size, width } from "react-native-responsive-sizes"
import { COLORS } from "./theme"

const generalStyles = StyleSheet.create(
    {
        container:{
            flex:1,
            paddingHorizontal: size(20),
            backgroundColor:COLORS.screenBackground

        }
    }
)

export {generalStyles};