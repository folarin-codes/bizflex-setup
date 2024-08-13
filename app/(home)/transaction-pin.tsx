import { generalStyles } from "@/theme/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import React,{useState, useRef} from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import CustomHeader from "@/components/CustomHeader";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';

import { COLORS, SIZES } from "@/theme/theme";
import CustomButton from "@/components/CustomButton";
import { height, size } from "react-native-responsive-sizes";
import { router } from "expo-router";
const TransactionPin = ()=>{

    const CELL_COUNT = 4;


    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });

    return(
        <SafeAreaView style={generalStyles.container}>
    
            <CustomHeader/>

            <View style={{marginTop:40}}>
                <Text style={{fontFamily:'medium', color:COLORS.primary, fontSize:size(SIZES.heading), textAlign:'center'}}>Enter Transaction Pin</Text>
                <Text style={{fontFamily:'regular', textAlign:'center', color:COLORS.text3}}>Kindly enter 4 digit Pin to continue transaction</Text>
            </View>

            <View>
            <CodeField
                    ref={ref}
                    {...props}
                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={[styles.codeFieldRoot, {marginHorizontal:10}]}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
                    testID="my-code-input"
                    renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor/> : null)}
                    </Text>
                    )}
                />
            </View>

            <View style={{position:'relative', marginTop:height(20)}}>
                <CustomButton title="Proceed" onPress={()=> router.push('/success')}/>
            </View>

        
           

        </SafeAreaView>

    )
}

export default TransactionPin;

const styles = StyleSheet.create({
    codeFieldRoot: {marginTop: 40, marginHorizontal:20},
    cell: {
      width: 66,
      height: 66,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 1,
      borderColor: COLORS.primary,
      textAlign: 'center',
      backgroundColor:COLORS.white,
      borderRadius:4,
    //   alignSelf:'center',
    //   justifyContent:'center',
    //   alignContent:'center',
    //   alignItems:'center',
    paddingTop:10
    },
    focusCell: {
      borderColor: COLORS.primary,
      borderWidth:1

    },
})