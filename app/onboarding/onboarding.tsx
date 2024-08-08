import { SafeAreaView } from "react-native-safe-area-context"
import { Text } from "react-native";




const Onboarding = ()=>{
    return(
        <SafeAreaView style={{backgroundColor:'white', flex:1}}> 
        <Text style={{color:'red'}}>hello word</Text>
        <Text>How are you today.</Text>

        </SafeAreaView>
    )
}

export default Onboarding;