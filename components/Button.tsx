import { TouchableOpacity, Text } from "react-native";
import { ActivityIndicator } from "react-native"
import {COLORS , SIZES} from '../theme/theme'

interface ButtonProp{
    text: string,
    isLoading?: boolean,
    buttonStyle?:{
        backgroundColor?:string,
        borderColor:string,
    
    },
    onPress: ()=> void,
    active?:Boolean

}


const Button = (item:ButtonProp)=>{
    const{text, isLoading,buttonStyle, onPress,active} = item;
    return(
        <TouchableOpacity style={{height:56, backgroundColor:active ? COLORS.primary : COLORS.inactiveBtn, borderRadius:8, borderWidth:1, justifyContent:"center", borderColor:COLORS.primary, ...buttonStyle}} onPress={onPress}>

            {
                isLoading ? <ActivityIndicator style={{alignSelf:'center'}}/> : <Text style={{color:'white', fontFamily:'medium', alignSelf:'center'}}>{text}</Text>
            }

        </TouchableOpacity>

    )
}

export default Button;