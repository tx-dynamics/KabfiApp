import React from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import { useLogin } from '../../context/LoginProvider';
import { Header } from "react-native-elements";
import HeaderCenterComponent from "../../components/Settings/HeaderCenterComponent";
import firebase from "firebase";
// import HeaderRight from "../../components/Settings/HeaderRight";
import HeaderLeftComponent from "../../components/Settings/HeaderLeftComponent";

const Settings = (props) => {
    const {setIsLoggedIn} = useLogin();        
        
    function userLogout(){
        firebase.auth().signOut();
        setIsLoggedIn(false);
    }

    return (
        
        <View style={styles.root}>            
            <Header
                backgroundColor="#F8F8F8"
                containerStyle={{ marginTop: 15 }}
                leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
                // rightComponent={<HeaderRight />}
                centerComponent={<HeaderCenterComponent name="Settings" />}
            />
            <View style={styles.contentArea}>

                <View style={styles.listContainer}>
                    <TouchableOpacity style={styles.listItem} onPress={()=> props.navigation.navigate('ResetPassword') }>
                        <Image source={require('../../../assets/ProjectImages/userSettings/change-password.png')} style={styles.listIconImage} />
                        <Text style={styles.listText}>Change Password</Text>                    
                    </TouchableOpacity>  
                    
                    <TouchableOpacity style={styles.listItem}>
                        <Image source={require('../../../assets/ProjectImages/userSettings/notification-settings.png')} style={styles.listIconImage} />
                        <Text style={styles.listText}>Notification Settings</Text>                    
                    </TouchableOpacity>  

                    {/* <TouchableOpacity style={styles.listItem}>
                        <Image source={require('../../../assets/ProjectImages/userSettings/about.png')} style={styles.listIconImage} />
                        <Text style={styles.listText}>About</Text>                    
                    </TouchableOpacity>   */}

                    <TouchableOpacity style={styles.listItem} onPress={userLogout}>
                        <Image source={require('../../../assets/ProjectImages/userSettings/logout.png')} style={styles.listIconImage} />
                        <Text style={styles.listText}>Log Out</Text>                    
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
        paddingVertical:20
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

export default Settings;