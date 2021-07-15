import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity,SafeAreaView, Linking } from 'react-native'
import { AntDesign, FontAwesome , FontAwesome5, Ionicons, MaterialIcons, Entypo     } from '@expo/vector-icons'; 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Signin = (props) => {
    return (
        <SafeAreaView style={styles.root}>
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
                        <TouchableOpacity style={styles.socialIconsContainerSingle} onPress={ () =>  Linking.openURL('fb://quraancoaching/1') } >
                            <FontAwesome name="facebook" style={styles.socialIcon}  />    
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialIconsContainerSingle} onPress={ () =>  Linking.openURL('http://twitter.com') }>
                            <Entypo name="twitter" style={styles.socialIcon} />
                        </TouchableOpacity>
                      
                       <TouchableOpacity style={styles.socialIconsContainerSingle}  onPress={ () =>  Linking.openURL('http://instagram.com') }>
                            <AntDesign name="instagram" style={styles.socialIcon} />
                        </TouchableOpacity>
                        {/* <View style={styles.socialIconsContainerSingle}>
                            <AntDesign name="google" style={styles.socialIcon} />
                        </View>                         */}
                    </View>

                    <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => props.navigation.navigate('ForgotPassword')} >
                        <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        alignItems:"center",
        backgroundColor:'white',
        flex: 1,
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
        // flex:1,  
        alignSelf:'center',                
        marginTop:70,
        // backgroundColor:'red',
        // height:300
    },  
    socialIconsContainerSingle:{
        // width:'30%',
        flex:1,        
        alignItems:'center',        
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