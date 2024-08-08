import { StyleSheet } from "react-native"
import { width } from "react-native-responsive-sizes"
import { COLORS } from "./theme"

const generalStyles = StyleSheet.create(
    {
        container:{
            flex:1,
            paddingHorizontal: width(20),
            backgroundColor:COLORS.screenBackground

        }
    }
)

export {generalStyles};