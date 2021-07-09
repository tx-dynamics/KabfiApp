import React from 'react';
import { Button, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../screens/Landing';

import Signin from '../screens/authentication/Signin';
import Signup from '../screens/authentication/Signup';
import ForgotPassword from '../screens/authentication/ForgotPassword';
import SendEmail from '../screens/authentication/SendEmail';

import Main from '../screens/home/Main';
import Settings from '../screens/home/Settings';
import EditProfile from '../screens/home/EditProfile';


const Stack = createStackNavigator();

const StackNavigator = (props) => {
  
  function getOptions(screenName, navigation){
    var title = "";
    var headerLeft = "";
    var headerRight = "";
    if(screenName === "settings"){
      title = 'Settings',
      headerLeft = this.renderHeaderLeft;
      headerRight=null;
    }
    else if ( screenName === "editProfile"){
      title = 'Edit Profile',
      headerLeft = () => (
        <TouchableOpacity style={{padding:20}} >
          <Text style={{color:'#197AFF'}}>Back</Text>
        </TouchableOpacity>        
      ),
      headerRight = ()=>(
        <TouchableOpacity style={{padding:20}} >
          <Text style={{color:'#727272'}}>Save</Text>
        </TouchableOpacity>        
      );
    }
    
    return { 
        headerLeft:headerLeft,
        headerRight: headerRight,        
        title: title,
        headerTitleAlign:'center',
        headerTintColor: 'black',
        headerStyle: {
          backgroundColor: '#F9F9F9',              
        },
        headerTitleStyle:{
          alignSelf:'center'
        },
        headerTitleStyle: {
          color:'black',              
        },
        HeaderBackButton:{
          // tintColor:'yellow'
        }
    }
  }

  return (
    <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />        

        <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />        
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />        
        <Stack.Screen name="SendEmail" component={SendEmail} options={{ headerShown: false }} />        

        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />        
        <Stack.Screen name="Settings" component={Settings} options={getOptions('settings')} />        
        <Stack.Screen name="EditProfile" component={EditProfile} options={getOptions('editProfile')} />        
    </Stack.Navigator>    
  );
};
export default StackNavigator;