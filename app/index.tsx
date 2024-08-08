import { SafeAreaView } from "react-native-safe-area-context"
import Onboarding from "./onboarding/onboarding"

import{View, Text} from 'react-native'
import { generalStyles } from "@/theme/styles"

export default function Page(){

    return(
        <SafeAreaView style={{flex:1}}>
    
            <Onboarding/>
         
        </SafeAreaView>

    )
}