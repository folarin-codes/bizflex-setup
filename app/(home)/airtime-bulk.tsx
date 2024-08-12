import React from "react";
import {View,Image, ImageBackground, Text, TouchableOpacity, StyleSheet} from 'react-native'
import CustomHeader from "@/components/CustomHeader";
import { generalStyles } from "@/theme/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "@/theme/theme";
import { height, size, width } from "react-native-responsive-sizes";
import CustomButton from "@/components/CustomButton";



const AirtimeBulk = ()=>{
    return(
        <SafeAreaView style={generalStyles.container}>
            <CustomHeader text="Airtime Bulk Purchase"/>

            <ImageBackground source={require('../../assets/images/Top.png')} style={{paddingVertical:42, marginTop:20}}>

                <Text style={{textAlign:'center'}}>Total</Text>

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', gap:10}}>
                    <Text style={{textAlign:'center', color:COLORS.brown, fontFamily:'semibold', fontSize:size(SIZES.larger)}}>₦0.00</Text>
                    <Image style={{width:16, height:16}} source={require('../../assets/images/eye.png')} tintColor={COLORS.brown}/>
                </View>

                <Text style={{textAlign:'center', color:COLORS.white, fontFamily:'regular'}}>Charges: <Text style={{fontWeight:'bold'}}>₦25</Text> </Text>

            </ImageBackground>

            <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:20}}>
                <TouchableOpacity style={styles.option}>
                    <Text style={{fontFamily:'semibold', color:COLORS.primary, fontSize:20}}>+</Text>
                    <Text style={styles.optionText}>Add Purchase</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <Image style={{width:16, height:16}} source={require('../../assets/images/export.png')}/>
                    <Text style={styles.optionText}>Add Purchase</Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row', justifyContent:'space-between', backgroundColor:'F3F7FF', marginVertical:20}}>
                <Text style={styles.text}>From</Text>
                <Text style={styles.text}>To</Text>
                <Text style={styles.text}>Amount</Text>
            </View>

            <View style={{marginTop:50}}>
                <Image style={{width:109, height:106, alignSelf:'center'}} source={require('../../assets/images/empty.png')}/>

                <Text style={{textAlign:'center', fontFamily:'regular', color:COLORS.text3}}>You currently do not have any bulk purchase</Text>
            </View>

            <View style={{marginTop:height(15)}}>
                <CustomButton title="Proceed" disabled/>
            </View>

        </SafeAreaView>

    )
}

export default AirtimeBulk;

const styles = StyleSheet.create({
    option:{
        borderColor:COLORS.primary,
        borderWidth:1,
        borderRadius:8,
        flexDirection:'row',
        justifyContent:'space-between',
        gap:10,
        paddingVertical:10,
        paddingHorizontal:width(6.5),
        alignItems:'center'

    },
    optionText:{
        fontFamily:'medium',
        color:COLORS.primary,
        
    },
    text:{
        fontFamily:'regular',
        color:'F3F7FF',
        fontSize:size(SIZES.xs)

    }
})