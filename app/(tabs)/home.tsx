import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, ImageBackground, Image, StyleSheet,Dimensions, TouchableOpacity, ScrollView } from "react-native"
import {  size } from "react-native-responsive-sizes"
import { StatusBar } from "react-native"


import { generalStyles } from "@/theme/styles"
import { COLORS, SIZES } from "@/theme/theme"
import { router } from "expo-router"

const {height , width } = Dimensions.get('window')

const Home = ()=>{
    return(
        <SafeAreaView style={{backgroundColor: COLORS.screenBackground, flex:1}}>
            <StatusBar translucent backgroundColor="transparent"/>

            <ScrollView showsHorizontalScrollIndicator={false}>

                <ImageBackground style={{width:width, paddingHorizontal:size(20),paddingTop:10}} source={require('../../assets/images/home-bg.png')} >
                    <View style={styles.container}>

                        <View style={styles.primaryContainer}>
                            <Image style={styles.avatar} source={require('../../assets/images/avatar.png')}/>

                            <View style={styles.textContainer}>
                                <Text style={[styles.text]}>Welcome!</Text>
                                <Text style={[styles.text, {fontWeight:'bold'}]}>Micheal</Text>
                                <TouchableOpacity style={styles.level}>
                                    <Text style={[styles.text, {alignSelf:'center'}]}>Level: 1</Text>
                                </TouchableOpacity>
                            </View>

                      
                        </View>

                        <Image style={{width:30, height:30}} source={require('../../assets/images/bell.png')}/>


                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardText}>Available Balance</Text>

                        <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
                            <Text style={[styles.cardText,{fontWeight:'bold', fontSize:SIZES.heading, color:COLORS.white}]}>NGN 3,000,000,286.00</Text>
                            <Image style={{height:15, width:15}} source={require('../../assets/images/eye.png')}/>
                        </View>

                        <View style={styles.cardPrimary}>
                            <View>
                                <Text style={styles.cardText}>Account Type | <Text>Freelancer</Text></Text>
                                <Text style={[styles.cardText, {color:COLORS.white}]}>Anuoluwapo Ezekiel</Text>

                            </View>

                            <View>
                                <Text style={styles.cardText}>Account Number: </Text>
                                <View style={{flexDirection:'row', alignItems:'center', gap:5}}> 
                                    <Text style={[styles.cardText, {color:COLORS.white}]}>3056564378</Text>

                                    <Image style={{width:15, height:15}} source={require('../../assets/images/copy.png')}/>
                                </View>

                                <Image style={{height:16, width:43}}  source={require('../../assets/images/bank.png')}/>

                            </View>
                        </View>

                    </View>

                    <View style={{flexDirection:'row', backgroundColor:'#515558', borderRadius:70, padding:10, justifyContent:'space-between', marginVertical:40, paddingVertical:20}}>

                        <TouchableOpacity style={styles.tabsImageContainer} >
                            <Image style={styles.tabsImage} source={require('../../assets/images/add.png')}/>
                            <Text style={styles.tabText}>Create sub acct.</Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> router.push('/bills')} style={styles.tabsImageContainer}>
                            <Image style={styles.tabsImage} source={require('../../assets/images/bills.png')}/>
                            <Text style={styles.tabText}>Pay Bills</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tabsImageContainer}>
                            <Image style={styles.tabsImage} source={require('../../assets/images/transfer.png')}/>
                            <Text style={styles.tabText}>Transfer</Text>

                        </TouchableOpacity>

                    </View>


                </ImageBackground>

                <View style={{paddingHorizontal:20, marginTop:30}}>

                    <View >
                        <Text style={{color:COLORS.text, fontFamily:'regular', fontWeight:'bold', marginBottom:10}}>Recent Transactions </Text>

                        <View style={{borderColor:'#D2D2D2', borderWidth:1, borderRadius:8, paddingVertical:80, backgroundColor:COLORS.white}}>

                            <Image source={require('../../assets/images/trans.png')} style={{width:64 , height:64, alignSelf:'center'}}/>

                            <Text style={{textAlign:'center', fontFamily:'regular'}}>No Transaction</Text>
                            <Text style={{textAlign:'center', fontFamily:'regular', fontSize:size(10)}}>You do not currently have any transaction.</Text>

                        </View>
                    </View>
                </View>

            </ScrollView>

  
        

        </SafeAreaView>
    )
}

export default Home;


const styles = StyleSheet.create({
    avatar:{
        height:40,
        width:40
    },
    text:{
        color:COLORS.white,
        fontFamily:'regular',
        fontSize:size(SIZES.xs)

    },
    textContainer:{
        flexDirection:'row',
        gap:5,
        // alignItems:'center'
    },
    level:{
        backgroundColor:COLORS.primary,
        borderRadius:5,
        padding:2,
        alignItems:'center',
        justifyContent:'center'
    },
    primaryContainer:{
        flexDirection:'row',
        alignItems:'center',
        gap:10
    },
    container:{

        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    card:{

        borderWidth:1,
        borderColor:COLORS.white,
        borderRadius:8,
        paddingHorizontal:10,
        paddingTop:40,
        marginTop:30
     
    },
    cardPrimary:{
        flexDirection:'row',
        marginTop:20,
        justifyContent:'space-between'
      
    },
    cardText:{
        color:COLORS.text2,
        fontFamily:'regular',
        
    },
    tabsImage:{
        height:33,
        width:33
    },
    tabsImageContainer:{
        flexDirection:'row',
        alignItems:'center',
        gap:5
    },
    tabText:{
        fontFamily:'regular',
        color:COLORS.white,
        fontSize:10
    }
})