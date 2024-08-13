import { COLORS } from "@/theme/theme";
import { Tabs } from "expo-router";
import React from "react";
import { View, Image, Text } from "react-native";
import { icons } from "@/theme/icons";

interface TabIconProps{
  icon: string,
  color:String,
  name: string,
  focused:boolean
}


const TabIcon = (item:TabIconProps)=>{

  const {icon , color, name, focused} = item;
  return(
    <View style={{flexDirection:'row', alignItems:'center', gap:5, backgroundColor:focused ? COLORS.navbg : 'transparent', borderRadius:50, padding:10}}>
      <Image style={{height:24 , width:24}} source={icon} resizeMode='contain' tintColor={color}/>
      {
        focused && <Text style={{color :COLORS.primary, fontFamily:'regular' }}>{name}</Text>
      }


    </View>

  )
}

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle:{
          height:80,
          alignItems:"center",
          alignContent:'center',
          paddingHorizontal:10
        
        }
      }}
    >
      <Tabs.Screen  options={{
             title:'',   
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={focused? icons.homeFocused: icons.home}
                color={focused? COLORS.primary : COLORS.text}
                name="Home"
                focused={focused}
              />
            ),
          }} name="home" />
      <Tabs.Screen  options={{
             title:'',   
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={focused ?icons.savingsFocused : icons.savings}
                color={focused? COLORS.primary : COLORS.text}
                name="Savings"
                focused={focused}
              />
            ),
          }} name="savings" />
      <Tabs.Screen  options={{
             title:'',   
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={ focused? icons.invoiceFocused : icons.invoice}
                color={focused? COLORS.primary : COLORS.text}
                name="Invoice"
                focused={focused}
              />
            ),
          }} name="invoice" />
      <Tabs.Screen  options={{
             title:'',   
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={focused? icons.cardFocused : icons.card}
                color={focused? COLORS.primary : COLORS.text}
                name="Card"
                focused={focused}
              />
            ),
          }} name="cards" />
      <Tabs.Screen  options={{
             title:'',   
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={focused?icons.moreFocused : icons.more}
                color={focused? COLORS.primary : COLORS.text}
                name="More"
                focused={focused}
              />
            ),
          }} name="more" />
    </Tabs>
  );
};

export default TabLayout;
