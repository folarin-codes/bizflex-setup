import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { generalStyles } from "@/theme/styles";
import CustomHeader from "@/components/CustomHeader";
import { View, Text , Image, ImageBackground, StyleSheet} from "react-native";
import CustomButton from "@/components/CustomButton";
import { COLORS, SIZES } from "@/theme/theme";
import { height, size } from "react-native-responsive-sizes";
import { router } from "expo-router";


const airtime = require('../../assets/images/airtime.png')

const Summary = ()=>{

    return(
        <SafeAreaView style={generalStyles.container}>
            <CustomHeader text="Airtime" image={airtime}/>

            <View>

                <View style={{backgroundColor:COLORS.primary, padding:20, borderRadius:14, flexDirection:'row', gap:10, marginVertical:20}}>
                    <Image style={{height:40 , width:40}} source={require('../../assets/images/review.png')}/>

                    <View>
                        <Text style={{fontFamily:'medium', color:COLORS.white}}>Review payment</Text>
                        <Text style={{fontFamily:'regular', fontSize:SIZES.xs,color:'#FFFFFFB5'}}>Double-check the details before you complete transaction</Text>
                    </View>

                </View>
            

                <ImageBackground imageStyle={{borderRadius:25}} style={{padding:20}} source={require('../../assets/images/bg.png')}>
                    <Image style={{height:50, width:50, alignSelf:'center'}} source={require('../../assets/images/avatar.png')}/>
                    <Text style={{textAlign:"center", color:COLORS.offwhite, fontFamily:'regular'}}>You're recharging</Text>
                    <Text style={{fontFamily:'bold', color:COLORS.white, textAlign:'center', fontSize:SIZES.large}}>₦200.00</Text>

                    <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20}}>

                        <View>
                            <Text style={styles.text}>From</Text>
                            <Text style={styles.text}>To</Text>
                            <Text style={styles.text}>Narration</Text>

                        </View>

                        <View>
                            <Text style={styles.text}>Holiday Expense Account</Text>
                            <Text style={styles.text}>GLO/08034565455</Text>
                            <Text style={styles.text}>Airtime/GLO/08033294143</Text>
                        </View>
                       
                    </View>
                </ImageBackground>

                <View style={{marginTop:height(30)}}>
                    <CustomButton title="Pay" onPress={()=> router.push('/transaction-pin')}/>
                </View>


            </View>

        </SafeAreaView>

    )

}


export default Summary;


const styles = StyleSheet.create({
    text:{
        color:COLORS.white,
        fontFamily:'regular',
        fontSize:size(SIZES.xs),
        marginBottom:5
    }
})