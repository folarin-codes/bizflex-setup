import { View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from '../theme/theme'

interface RadioButtonProps{
    clicked?:Boolean,
    onPress?:() => void
}

const RadioButton = (item:RadioButtonProps)=>{

   const {clicked, onPress} = item

    return(

        <TouchableOpacity onPress={onPress} style={{width: 24, height:24, borderRadius:100, borderWidth:2, borderColor: clicked? COLORS.primary : COLORS.text, justifyContent:"center"}}>

            {
                clicked && <View style={{width: 12, height:12, borderRadius:100, alignSelf:'center', backgroundColor:COLORS.primary}}/>
            }

        </TouchableOpacity>

    )
}

export default RadioButton;