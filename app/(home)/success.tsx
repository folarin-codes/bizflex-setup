import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import{View, Text} from 'react-native'
import { generalStyles } from "@/theme/styles";
import CustomHeader from "@/components/CustomHeader";
import CustomButton from "@/components/CustomButton";
import { COLORS, SIZES } from "@/theme/theme";
import { height, size } from "react-native-responsive-sizes";
import { router } from "expo-router";



const Success = ()=>{
    return(
        <SafeAreaView style={generalStyles.container}>
            <CustomHeader/>

            <View style={{marginTop:height(30)}}>

                <Text style={{color:COLORS.success, fontFamily:'medium', textAlign:'center', fontSize:size(SIZES.heading)}}>Success</Text>
                <Text style={{textAlign:'center', fontFamily:'regular', color:COLORS.text3}}>Airtime purchase successful!</Text>

            </View>

            <View style={{marginTop:height(5)}}>

              <CustomButton title="Proceed" onPress={()=> router.push('/home')}/>

            </View>


        </SafeAreaView>

    )

}

export default Success;