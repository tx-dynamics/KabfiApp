import React from 'react';
import { Button, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


import Signin from '../screens/authentication/Signin';
import Signup from '../screens/authentication/Signup';


const Stack = createStackNavigator();

const StackNavigator = (props) => {
  
  function getOptions(screenName, navigation){
    var title = "";
    var headerLeft = "";
    var headerRight = "";
    if(screenName === "home"){
      title = 'DogSpot Services',
      headerLeft = null;
      headerRight=null;
    }
    else if(screenName === "dashboard"){
      title = 'Dashboard',
      headerLeft = this.renderHeaderLeft;
      headerRight=null;
    }
    else if(screenName === "payment"){
      title = 'Payment Method',
      headerLeft = this.renderHeaderLeft;
      headerRight=null;
    }
    else if(screenName === "advertisement"){
      title = 'My Ads',
      headerLeft = this.renderHeaderLeft;
      headerRight = ()=>(
        <TouchableOpacity style={{padding:20}} onPress={()=> navigation.navigate('CreateAd')}>
          <FontAwesome5 name="plus" size={24} color="black" />
        </TouchableOpacity>        
      );
    }
    else if(screenName === "createAd"){
      title = 'Create Ad',
      headerLeft = this.renderHeaderLeft;
      headerRight =null; 
    }


    return { 
        headerLeft:headerLeft,
        headerRight: headerRight,        
        title: title,
        headerTitleAlign:'center',
        headerTintColor: 'black',
        headerStyle: {
          backgroundColor: '#FFFFFF',              
        },
        headerTitleStyle:{
          alignSelf:'center'
        },
        headerTitleStyle: {
          color:'#F7733D',              
        },
        HeaderBackButton:{
          tintColor:'yellow'
        }
    }
  }
  
  return (
    <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />        
    </Stack.Navigator>    
  );
};
export default StackNavigator;