import React from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import { useLogin } from '../../context/LoginProvider';


const Legal = (props) => {
    const {setIsLoggedIn} = useLogin();        
        
    return (
        <View style={styles.root}>            
            <View style={styles.contentArea}>

                <View style={styles.listContainer}>
                    <TouchableOpacity style={styles.listItem} onPress={()=> props.navigation.navigate('TermsAndConditions') }>
                        {/* <Image source={require('../../../assets/ProjectImages/userSettings/change-password.png')} style={styles.listIconImage} /> */}
                        <Text style={styles.listText}>Terms and Conditions </Text>                    
                    </TouchableOpacity>  
                    
                    <TouchableOpacity style={styles.listItem} onPress={()=> props.navigation.navigate('PrivacyPolicy') }>
                        {/* <Image source={require('../../../assets/ProjectImages/userSettings/notification-settings.png')} style={styles.listIconImage} /> */}
                        <Text style={styles.listText}>Privacy Policy</Text>                    
                    </TouchableOpacity>  
                </View>      
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    root:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor:'white',   
        flex: 1,     
    },
    contentArea:{
        alignItems:'center',        
        width:'100%',
        height:'100%',
        paddingHorizontal:25,
        paddingVertical:60
    },
    listContainer:{
        width:'100%'
    },  
    listItem:{        
        width:'100%',         
        flexDirection:'row', 
        paddingHorizontal:10, 
        paddingVertical:17, 
        alignItems:'center'
    },
    listIconImage:{
        width:20,
        height:22
    },
    listText:{
        marginLeft:10,
        color:'#474747'
    }
});

export default Legal;