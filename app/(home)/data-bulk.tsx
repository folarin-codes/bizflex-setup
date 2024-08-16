import React, {useRef} from "react";
import {View,Image, ImageBackground, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native'
import CustomHeader from "@/components/CustomHeader";
import { generalStyles } from "@/theme/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "@/theme/theme";
import { height, size, width } from "react-native-responsive-sizes";
import CustomButton from "@/components/CustomButton";
import RBSheet from "react-native-raw-bottom-sheet";



const DataBulk = ()=>{

    const bulkRef = useRef()

    return(
        <SafeAreaView style={generalStyles.container}>
            <CustomHeader text="Data Bulk Purchase"/>

            <ImageBackground source={require('../../assets/images/Top.png')} style={{paddingVertical:42, marginTop:20}}>

                <Text style={{textAlign:'center', color:COLORS.white, fontSize:size(16)}}>Total</Text>

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

                <TouchableOpacity style={styles.option} onPress={()=> bulkRef.current.open()}>
                    <Image style={{width:16, height:16}} source={require('../../assets/images/export.png')}/>
                    <Text style={styles.optionText}>Upload Purchase</Text>
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

            <RBSheet ref={bulkRef} customStyles={{
                container:{
                    borderTopRightRadius:15,
                    borderTopLeftRadius:15
                }

                
                
            }} height={height(70)}>

                <View>

                    <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20, borderBottomColor:'#E7E8EA', borderBottomWidth:1, paddingHorizontal:20, paddingBottom:5}}>
                        <Text style={{fontFamily:'medium', fontSize:16}}>Upload purchase</Text>

                        <TouchableOpacity onPress={()=> bulkRef.current.close()}>
                            <Image style={{height:24, width:24, alignSelf:'flex-end'}} source={require('../../assets/images/close.png')}/>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginHorizontal:width(10)}}>

                        <View style={{marginTop:20}}>
                            <Image style={{width:64, height:64, alignSelf:'center', marginVertical:10}} source={require('../../assets/images/upload.png')}/>

                            <Text style={{fontFamily:'semibold', textAlign:'center',color:COLORS.text}}>Upload a CSV with a list of Transfers</Text>
                            <Text style={{fontFamily:'regular', textAlign:'center'}}>Please see the <Text style={{color:COLORS.primary}}>sample CSV</Text> or guidance</Text>
                        </View>

                        <TouchableOpacity style={{flexDirection:'row', justifyContent:'center', gap:10, borderWidth:1, borderColor:COLORS.primary, padding:10, borderRadius:8, marginVertical:20}}>
                            <Image style={{height:24, width:24}} source={require('../../assets/images/upl.png')}/>
                            <Text>Upload CSV file here</Text>
                        </TouchableOpacity>

                        <View style={{marginVertical:20}}>
                            <Text style={{fontFamily:'medium', fontSize:12}}>Choose Account you want to transfer from</Text>

                            <View>
                            <TextInput style={[styles.input, {fontFamily:'regular'}]} placeholder="Select count to pay from"/>

                            <Image style={{height:24, width:24,position:'absolute', right:20, top:15}} source={require('../../assets/images/arrow-down.png')}/>

                            </View>

                        </View>

                        <View style={{marginVertical:30}}> 
                            <CustomButton title="Proceed" disabled/>
                        </View>

                    </View>


                </View>

            </RBSheet>

        </SafeAreaView>

    )
}

export default DataBulk;

const styles = StyleSheet.create({
    option:{
        borderColor:COLORS.primary,
        borderWidth:1,
        borderRadius:8,
        flexDirection:'row',
        justifyContent:'space-between',
        gap:10,
        paddingVertical:10,
        paddingHorizontal:width(4),
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

    },
    input:{
        borderWidth:1 , borderColor:'#8E8E8E', paddingVertical:15, borderRadius:8, backgroundColor:COLORS.white, fontFamily:'semibold', color:COLORS.text, paddingHorizontal:20
    }
})