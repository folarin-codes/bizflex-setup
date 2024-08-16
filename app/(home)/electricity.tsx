import { SafeAreaView } from "react-native-safe-area-context"
import React from "react";
import CustomHeader from "@/components/CustomHeader";
import { generalStyles } from "@/theme/styles";
import {View, Text, TouchableOpacity, Image, StyleSheet, TextInput} from 'react-native'
import { COLORS } from "@/theme/theme";
import { height, width } from "react-native-responsive-sizes";
import CustomButton from "@/components/CustomButton";

const bolt = require('../../assets/images/bolt.png')



const Electricity = ()=>{
    return(
        <SafeAreaView style={generalStyles.container}>
            <CustomHeader text="Electricity" image={bolt}/>

            <View style={{marginTop:20}}>
                <Text style={styles.text}>Select Provider</Text>
                
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>

                    <TouchableOpacity style={styles.option} >
                        <Image resizeMode="contain" style={styles.image} source={require('../../assets/images/elec1.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option}>
                        <Image resizeMode="contain" style={styles.image} source={require('../../assets/images/elec2.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option}>
                        <Image resizeMode="contain" style={styles.image} source={require('../../assets/images/elec3.png')}/>
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
                    <Text style={styles.text}>Meter number</Text>
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

export default Electricity;


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