
import React, {useState} from "react"
import {View, Pressable, Text} from 'react-native'
import RadioButton from "./RadioButton"
import { width } from "react-native-responsive-sizes";

interface DropdownProps{
    data :{ value: string; label: string }[],
    getValue: (value: string) => void;

}
const Dropdown = (item : DropdownProps)=>{

    const {data, getValue} = item;

    const [value , setValue] = useState<string>('')
    return(
        <View style={{backgroundColor:'white', padding:20, borderWidth:1 , borderColor:'#C6D8FF', borderRadius:6, width:width(65), position:'absolute', zIndex:20, right:10, top:90}}>
            {
                data.map((data)=>{
                    return(
                        <Pressable style={{flexDirection:'row', alignItems:'center', marginVertical:5, gap:10}}>
                            <RadioButton clicked={value == data.value}  onPress={()=> {getValue(data.value); setValue(data.value)}}/>
                            <Text>{data.value}</Text>
                        </Pressable>

                    )

                })
            }

        </View>
    )

}

export default Dropdown