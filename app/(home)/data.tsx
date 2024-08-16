import { SafeAreaView } from "react-native-safe-area-context"
import React from "react"
import { generalStyles } from "@/theme/styles";
import CustomHeader from "@/components/CustomHeader";
import {View, Text, TextInput, Image, Pressable, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import { fontSize, height } from "react-native-responsive-sizes";

import { COLORS, SIZES } from "@/theme/theme";

import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";


const data = require('../../assets/images/data2.png')


const Data = ()=>{
    return(

        <SafeAreaView style={generalStyles.container}>

            <CustomHeader text="Data" image={data}/>


            <ScrollView style={{marginTop:20}} showsVerticalScrollIndicator={false}>
                <Text style={styles.text}>Add Mobile Number</Text>
                <Text style={{fontFamily:'regular', color:COLORS.text4}}>Enter recipient mobile number</Text>
                <View style={{marginTop:20}}>
                  <TextInput placeholder="Enter phone number" style={[styles.input, {fontFamily:'regular'}]}/>
                  <Image style={{width:16, height:16, position:'absolute', right:20, top:20}} source={require('../../assets/images/book.png')}/>
                  
                </View>

                <View style={{flexDirection:'row', alignItems:'center', marginTop:10, gap:10, justifyContent:'space-between'}}>

                    <View style={styles.beneContainer}>
                        <Pressable style={{height:14, width:14, borderWidth:1, borderColor:'#B4B4B4', borderRadius:2}}>

                        </Pressable>

                        <Text>Save beneficiary</Text>

                    </View>

                    <View style={styles.beneContainer}>
                        <Image source={require('../../assets/images/profile.png')} style={{width:18, height:18}}/>
                        <Text>Select beneficiary</Text>
                    </View>
               

                </View>

                <Text style={[styles.text, {marginTop:20}]}>Network</Text>

                <View style={{marginTop:20}}>
                    <Text style={styles.text}>Plan</Text>
                    <View>
                        <TextInput style={[styles.input, {fontFamily:'regular'}]} placeholder="Select preferred plan"/>
                        <Image style={{height:24, width:24,position:'absolute', right:20, top:15}} source={require('../../assets/images/arrow-down.png')}/>

                    </View>
                </View>

                <View style={{marginTop:20}}>
                    <Text style={styles.text}>Amount</Text>

                    <TextInput style={[styles.input, {paddingVertical:20, textAlign:'center'}]} placeholder="₦0.00"/>

                    {/* <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10}}>
                        <TouchableOpacity style={styles.amount}>
                            <Text style={styles.amountText}>₦100.00</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.amount}>
                            <Text style={styles.amountText}>₦200.00</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.amount}>
                            <Text style={styles.amountText}>₦500.00</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.amount}>
                            <Text style={styles.amountText}>₦1000.00</Text>
                        </TouchableOpacity>
                    </View> */}

                </View>

                <View style={{marginTop:20}}>
                    <Text style={styles.text}>Pay From</Text>
                    <View>
                        <TextInput style={[styles.input, {fontFamily:'regular'}]} placeholder="Select count to pay from"/>
                        <Image style={{height:24, width:24,position:'absolute', right:20, top:15}} source={require('../../assets/images/arrow-down.png')}/>

                    </View>
                </View>

                <View style={{marginTop:height(8)}}>
                    <CustomButton title="Proceed" onPress={()=> router.push('/summary')}/>
                </View>

         
            </ScrollView>

        </SafeAreaView>
    )
}

export default Data;


const styles = StyleSheet.create({
    beneContainer:{flexDirection:'row', alignItems:'center', gap:10},
    input:{borderWidth:1 , borderColor:'#C6D8FF', paddingVertical:15, borderRadius:8, backgroundColor:COLORS.white, fontFamily:'semibold', color:COLORS.text, paddingHorizontal:20},
    amount:{
        borderColor:'#DEE9FF',
        borderWidth:1,
        padding:10
    },
    amountText:{
        fontFamily:'regular',
        color:'#8E8E8E',
        fontSize:SIZES.xs
    },
    text:{
        fontFamily:'medium',
        marginBottom:5
    }
    
})