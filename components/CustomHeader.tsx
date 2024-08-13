

import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '@/theme/theme'
import { size } from 'react-native-responsive-sizes'
import { router } from 'expo-router'

interface headerProp{
    text?: string,
    image?: string
}

const CustomHeader = (items:headerProp) => {
    const {text , image} = items
  return (
    <Pressable onPress={()=> router.back()} style={{flexDirection:'row', alignItems:'center' , justifyContent:'space-between', marginTop:10}}>
        <Image style={{width:30 , height:30}} source={require('../assets/images/back.png')}/>

        <View style={{flexDirection:'row', alignItems:'center', gap:10}}>

          {
            image && <Image style={{height:40, width:40}} source={image}/>
          }

            <Text style={{fontFamily:'semibold', color:COLORS.text, fontSize:size(SIZES.regular)}}>{text}</Text>

        </View>

        <Text></Text>
     
    </Pressable>
  )
}

export default CustomHeader