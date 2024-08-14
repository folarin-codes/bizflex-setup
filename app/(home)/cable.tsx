import { generalStyles } from "@/theme/styles";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context"
import {View, Text, Image, TouchableOpacity, StyleSheet, TextInput} from 'react-native'
import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import { height, width, size } from "react-native-responsive-sizes";
import {COLORS, SIZES} from '../../theme/theme'


const cable = require('../../assets/images/cable2.png')

const Cable = ()=>{
    return(
        <SafeAreaView style={generalStyles.container}>
            <CustomHeader text="Cable TV" image={cable}/>

            <View style={{marginTop:20}}>
                <Text style={styles.text}>Select Biller</Text>
                
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>

                    <TouchableOpacity style={styles.option} >
                        <Image resizeMode="contain" style={styles.image} source={require('../../assets/images/dstv.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option}>
                        <Image resizeMode="contain" style={styles.image} source={require('../../assets/images/gotv.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option}>
                        <Image resizeMode="contain" style={styles.image} source={require('../../assets/images/startimes.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option} >
                       <Text style={{alignSelf:'center', fontFamily:"regular"}}>+ more</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{marginTop:20}}>
                    <Text style={styles.text}>Product</Text>
                    <View>
                        <TextInput style={[styles.input, {fontFamily:'regular'}]} placeholder="Select count to pay from"/>
                        <Image style={{height:24, width:24,position:'absolute', right:20, top:15}} source={require('../../assets/images/arrow-down.png')}/>

                    </View>
            </View>

            <View style={{marginTop:20}}>
                    <Text style={styles.text}>Smart Card Number</Text>
                    <View>
                        <TextInput style={[styles.input, {fontFamily:'regular'}]} placeholder="Select count to pay from"/>
                        <Image style={{height:24, width:24,position:'absolute', right:20, top:15}} source={require('../../assets/images/arrow-down.png')}/>

                    </View>
            </View>

            <View style={{marginTop:20}}>
                <Text style={styles.text}>Amount</Text>
                <TextInput style={[styles.input, {paddingVertical:20, textAlign:'center'}]} placeholder="₦0.00"/>
            </View>


            <View style={{marginTop:20}}>
                    <Text style={styles.text}>Pay From</Text>
                    <View>
                        <TextInput style={[styles.input, {fontFamily:'regular'}]} placeholder="Select count to pay from"/>
                        <Image style={{height:24, width:24,position:'absolute', right:20, top:15}} source={require('../../assets/images/arrow-down.png')}/>

                    </View>
            </View>

            <View style={{marginVertical:height(12)}}>
                <CustomButton title="Proceed" disabled/>
            </View>




        </SafeAreaView>
    )
}

export default Cable;



const styles = StyleSheet.create({
    image:{
        width:60,
        height:80,
        alignSelf:'center'
      
    },
    option:{
        width:width(20),
        backgroundColor:COLORS.white,
        justifyContent:'center',
        borderRadius:9

    },

    input:{borderWidth:1 , borderColor:'#C6D8FF', paddingVertical:15, borderRadius:8, backgroundColor:COLORS.white, fontFamily:'semibold', color:COLORS.text, paddingHorizontal:20},
    text:{
        fontFamily:'medium',
        marginBottom:5
    }
})