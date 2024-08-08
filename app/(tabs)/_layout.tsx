import { Tabs } from "expo-router"


const TabLayout = ()=>{

  return(
    <Tabs>
      <Tabs.Screen name="home"/>
      <Tabs.Screen name ='savings'/>
      <Tabs.Screen name = "invoice"/>
      <Tabs.Screen name = 'cards'/>
      <Tabs.Screen name='more'/>
    </Tabs>
  )


}


export default TabLayout;