import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native'
import { AntDesign, FontAwesome , FontAwesome5, Ionicons, MaterialIcons, Entypo     } from '@expo/vector-icons'; 


const Signin = (props) => {
    return (
        <View style={styles.root}>
            <StatusBar style="dark" />             
            <View style={styles.contentArea}>
                
                <View style={styles.logoContainer}>
                    <Image source={require('../../../assets/ProjectImages/logo.png')} style={styles.logoImage} />
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>


                <View style={styles.loginForm}>
                    <View style={styles.textFieldContainer}>
                        {/* <FontAwesome5 name="user-alt" style={styles.fieldIcon} /> */}
                        <Image source={require('../../../assets/ProjectImages/authentication/user-icon.png')} style={styles.fieldIcon} />                   
                        <TextInput style={styles.textField} value="John Doe" />
                    </View>

                    <View style={[styles.textFieldContainer,{marginTop:20}]}>                        
                        {/* <Ionicons name="md-mail" style={styles.fieldIcon} /> */}
                        <Image source={require('../../../assets/ProjectImages/authentication/mail-icon.png')} style={styles.fieldIcon} />                   
                        <TextInput style={styles.textField} value="johndoe@mail.com" />
                    </View>

                    <View style={[styles.textFieldContainer,{marginTop:20}]}>                        
                        {/* <MaterialIcons name="lock" style={styles.fieldIcon} /> */}
                        <Image source={require('../../../assets/ProjectImages/authentication/password-icon.png')} style={styles.fieldIcon} />                   
                        <TextInput style={styles.textField} value="1234567" secureTextEntry={true} />
                    </View>

                    <View>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => props.navigation.navigate('Main')}>
                            <Text>Login</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.socialIconsContainer}>
                        <View style={styles.socialIconsContainerSingle}>
                            <FontAwesome name="facebook-f" style={styles.socialIcon} />    
                        </View>
                        <View style={styles.socialIconsContainerSingle}>
                            <Entypo name="twitter" style={styles.socialIcon} />
                        </View>
                        <View style={styles.socialIconsContainerSingle}>
                            <AntDesign name="instagram" style={styles.socialIcon} />
                        </View>
                        <View style={styles.socialIconsContainerSingle}>
                            <AntDesign name="google" style={styles.socialIcon} />
                        </View>                        
                    </View>

                    <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => props.navigation.navigate('ForgotPassword')} >
                        <Text style={styles.forgotPasswordText}>Forogt Password ?</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        alignItems:"center",
        backgroundColor:'white'
    },
    contentArea:{
        width:'100%',
        height:'100%',
        marginTop:'10%',
        paddingHorizontal:20,
        paddingVertical:10    
    },
    logoContainer:{
        alignItems:'center'
    },
    logoImage:{
        width:110, 
        height:110
    },
    loginForm:{
        marginTop:50,
        width:'100%'
    },
    textFieldContainer:{
        
    },
    textField:{        
        borderBottomWidth:1,
        borderBottomColor:'black',
        paddingHorizontal:40,
        paddingVertical:10,
        
    },
    fieldIcon:{
        // fontSize:18,
        // color:'#FAB040',
        width:15,
        height:13,
        position:'absolute',
        top:18
    },
    loginBtn:{
        marginTop:40,
        backgroundColor:'#FAB040',
        alignItems:'center',
        padding:12
    },
    socialIconsContainer:{
        flexDirection:'row',
        width:'65%',        
        alignSelf:'center',                
        marginTop:70
    },  
    socialIconsContainerSingle:{
        width:'25%',        
        alignItems:'center'      
    },
    socialIcon:{
        fontSize:14,
        color:'#464646',        
    },
    forgotPasswordContainer:{
        alignItems:'center',
        marginTop:40
    },
    forgotPasswordText:{        
        fontSize:12
    }
});

export default Signin;