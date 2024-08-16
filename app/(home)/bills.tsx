import React , {useRef, useState} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import CustomButton from "@/components/CustomButton";
import { generalStyles } from "@/theme/styles";
import CustomHeader from "@/components/CustomHeader";
import { size, width } from "react-native-responsive-sizes";
import { COLORS, SIZES } from "@/theme/theme";
import RBSheet from 'react-native-raw-bottom-sheet';
import { router } from "expo-router";



const Bills = ()=>{

    
    const sheetRef = useRef()
    const dataRef = useRef()

    const DataBottomSheet = ()=>{

       ;
        return(

            <RBSheet height={500} ref={dataRef} customStyles={{
                container:{
                    borderTopRightRadius:15,
                    borderTopLeftRadius:15
                }
                
            }}>

                <View style={{paddingHorizontal:size(20), marginTop:30}}>

                    <Image style={{height:24, width:24, alignSelf:'flex-end'}} source={require('../../assets/images/close.png')}/>

                    <View style={{flexDirection:'row', gap:15, marginTop:20}}>
                        <Image source={require('../../assets/images/data2.png')} style={{width:40 , height:40}}/>

                        <View>
                            <Text style={{fontFamily:'semibold'}}>Data</Text>
                            <Text style={{fontFamily:'regular'}}>purchase Data using your account</Text>
                        </View>
                    </View>

                    <View style={{marginTop:30, borderColor:'#E7E8EA', borderWidth:1, padding:20,borderRadius:8}}>
                        <Text style={{fontFamily:'semibold', color:COLORS.text}}>Choose a Type of Data Purchase</Text>
                        <Text style={{fontFamily:'regular', color:COLORS.text}}>Select a mode of purchase</Text>

                        <View style={{gap:20, marginTop:40}}>

                        <TouchableOpacity style={[styles.billContainer, {borderColor:'#E7E8EA'}]} onPress={()=> {dataRef.current.close(); router.push('/data')}}>
                            <View style={[styles.containerSecondary, {padding:10}]}>
                                <Image style={styles.image2} source={require('../../assets/images/single.png')}/>
                                <Text style={styles.text}>To a single number</Text>

                            </View>

                            <Image style={styles.right} source={require('../../assets/images/right.png')}/>

                        </TouchableOpacity>


                        <TouchableOpacity style={[styles.billContainer, {borderColor:'#E7E8EA'}]} onPress={()=>{dataRef.current.close(); router.push('/data-bulk')}}>
                            <View style={[styles.containerSecondary, {padding:10}]}>
                                <Image style={styles.image2} source={require('../../assets/images/bulk.png')}/>
                                <Text style={styles.text}>Make a bulk purchase</Text>

                            </View>

                            <Image style={styles.right} source={require('../../assets/images/right.png')}/>

                        </TouchableOpacity>
                        </View>
                    </View>

                </View>
               
            </RBSheet>

        
        )

    }

    return(
        <SafeAreaView style={generalStyles.container}>
            <View style={{marginTop:20}}>
                <CustomHeader />
            </View>

            <View style={{paddingHorizontal:20, marginTop:40}}>
                <View style={{flexDirection:'row', gap:10}}>
                    <Image style={{height:40 , width:40}} source={require('../../assets/images/bill.png')}/>
                    <View>
                        <Text style={{fontFamily:'semibold', fontSize:size(SIZES.regular), color:COLORS.text}}>Pay Bills</Text>
                        <Text style={{fontFamily:'regular', color:COLORS.text3}}>Make bill payment using your account</Text>
                    </View>
                </View>

                <View style={{backgroundColor:COLORS.white, borderRadius:16, paddingVertical:30, marginTop:30}}>
                    <Text style={{fontFamily:'medium', color:COLORS.text3}}>Choose a Type of Bill</Text>

                    <View style={{marginTop:30, gap:20}}>

                        <TouchableOpacity style={[styles.billContainer, {borderColor:COLORS.primary, backgroundColor:'#F1F5FE'}]} onPress={()=> sheetRef.current.open()}>
                            <View style={styles.containerSecondary}>
                                <Image style={styles.image} source={require('../../assets/images/airtime2.png')}/>
                                <Text style={[styles.text, {color:COLORS.text, fontFamily:'semibold'}]}>Airtime</Text>

                            </View>

                            <Image style={styles.right} source={require('../../assets/images/right.png')}/>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.billContainer} onPress={()=> dataRef.current.open()}>
                            <View style={styles.containerSecondary}>
                                <Image style={styles.image} source={require('../../assets/images/data.png')}/>
                                <Text style={styles.text}>Data</Text>

                            </View>

                            <Image style={styles.right} source={require('../../assets/images/right.png')}/>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> router.push('/electricity')} style={styles.billContainer}>
                            <View style={styles.containerSecondary}>
                                <Image style={styles.image} source={require('../../assets/images/electricity.png')}/>
                                <Text style={styles.text}>Electricity</Text>

                            </View>

                            <Image style={styles.right} source={require('../../assets/images/right.png')}/>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> router.push('/cable')} style={styles.billContainer}>
                            <View style={styles.containerSecondary}>
                                <Image style={styles.image} source={require('../../assets/images/cable.png')}/>
                                <Text style={styles.text}>Cable</Text>

                            </View>

                            <Image style={styles.right} source={require('../../assets/images/right.png')}/>

                        </TouchableOpacity>



                    </View>



                </View>
            </View>

            <RBSheet height={500} ref={sheetRef} customStyles={{
                container:{
                    borderTopRightRadius:15,
                    borderTopLeftRadius:15
                }
                
            }}>

                <View style={{paddingHorizontal:size(20), marginTop:30}}>

                    <Image style={{height:24, width:24, alignSelf:'flex-end'}} source={require('../../assets/images/close.png')}/>

                    <View style={{flexDirection:'row', gap:10, marginTop:20}}>
                        <Image source={require('../../assets/images/airtime.png')} style={{width:40 , height:40}}/>

                        <View>
                            <Text>Airtime</Text>
                            <Text>purchase airtime using your account</Text>
                        </View>
                    </View>

                    <View style={{marginTop:30, borderColor:'#E7E8EA', borderWidth:1, padding:20,borderRadius:8}}>
                        <Text style={{fontFamily:'semibold', color:COLORS.text}}>Choose a Type of Airtime Purchase</Text>
                        <Text style={{fontFamily:'regular', color:COLORS.text}}>Select a mode of purchase</Text>

                        <View style={{gap:20, marginTop:40}}>

                        <TouchableOpacity style={[styles.billContainer, {borderColor:'#E7E8EA'}]} onPress={()=>{sheetRef.current.close();  router.push('/airtime')} }>
                            <View style={[styles.containerSecondary, {padding:10}]}>
                                <Image style={styles.image2} source={require('../../assets/images/single.png')}/>
                                <Text style={styles.text}>To a single number</Text>

                            </View>

                            <Image style={styles.right} source={require('../../assets/images/right.png')}/>

                        </TouchableOpacity>


                        <TouchableOpacity style={[styles.billContainer, {borderColor:'#E7E8EA'}]} onPress={()=>{ sheetRef.current.close(); router.push('/airtime-bulk');}}>
                            <View style={[styles.containerSecondary, {padding:10}]}>
                                <Image style={styles.image2} source={require('../../assets/images/bulk.png')}/>
                                <Text style={styles.text}>Make a bulk purchase</Text>

                            </View>

                            <Image style={styles.right} source={require('../../assets/images/right.png')}/>

                        </TouchableOpacity>
                        </View>
                    </View>

                </View>
               
            </RBSheet>
            <DataBottomSheet/>
           

        </SafeAreaView>
    )
}

export default Bills;


const styles = StyleSheet.create({
    image:{
        height:47,
        width:47
    },
    billContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderWidth:1,
        borderColor:'#E7E8EA',
        padding:15,
        borderRadius:10,
        backgroundColor:COLORS.white
    },
    text:{
        fontFamily:'regular',
        color: COLORS.text4

    },
    right:{
        height:18,
        width:18
    },
    containerSecondary:{flexDirection:'row', alignItems:'center', gap:10},
    image2:{
        height:16,
        width:16

    }
})