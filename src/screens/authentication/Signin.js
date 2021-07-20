import { StatusBar } from 'expo-status-bar';
import React,{useState, useRef, useEffect} from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity,SafeAreaView, Linking, ActivityIndicator, AsyncStorage  } from 'react-native'
import { AntDesign, FontAwesome , FontAwesome5, Ionicons, MaterialIcons, Entypo     } from '@expo/vector-icons'; 
import { useLogin } from '../../context/LoginProvider';
import { kabfiApp, firebase } from '../../database/config';

// import * as firebase from 'firebase'

// import kabfiApp from '../../database/config';
// const table_todo = kabfiApp.database().ref('/ToDo');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Signin = (props) => {
    const[firstName, setFirstName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [loader, setLoader] = useState(false);    

    const {setIsLoggedIn} = useLogin();

    async function userSignin(){
        setLoader(true);
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( async (user)=>{
            // Async storage starts
            storeData = async () => {
                try {
                  await AsyncStorage.setItem('@user', user.user.uid)
                } catch (e) {
                  // saving error
                }
              }
            storeData(); 
            // Async storage ends
            setIsLoggedIn(true);
            setLoader(false);
        })
        .catch((error)=>{
            alert(error.message)
            setLoader(false);
        })
    }

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
                        <Image source={require('../../../assets/ProjectImages/authentication/user-icon.png')} style={styles.fieldIcon} />                   
                        <TextInput style={styles.textField} placeholder="Name" value={firstName} onChangeText={(e)=>setFirstName(e)} />
                    </View>

                    <View style={[styles.textFieldContainer,{marginTop:20}]}>                        
                        <Image source={require('../../../assets/ProjectImages/authentication/mail-icon.png')} style={styles.fieldIcon} />                   
                        <TextInput style={styles.textField} value={email} placeholder="Email" onChangeText={(e)=>setEmail(e)} />
                    </View>

                    <View style={[styles.textFieldContainer,{marginTop:20}]}>                        
                        <Image source={require('../../../assets/ProjectImages/authentication/password-icon.png')} style={styles.fieldIcon} />                   
                        <TextInput style={styles.textField} placeholder="Password" value={password} onChangeText={(e)=>setPassword(e)} secureTextEntry={true} />
                    </View>

                    <View>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => userSignin() }>
                            { 
                                loader ? 
                                <ActivityIndicator color={"red"} size={'small'} />
                                :                            
                                <Text>Login</Text>
                            }                            
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