import React from "react";
import { Stack } from "expo-router"


const HomeLayout = ()=>{

    return(
        <Stack screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name="bills"/>
            <Stack.Screen name="airtime"/>
            <Stack.Screen name='summary'/>
            <Stack.Screen name="transaction-pin"/>
            <Stack.Screen name="success"/>
            <Stack.Screen name='airtime-bulk'/>

        </Stack>
    )

}

export default HomeLayout;