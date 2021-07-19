import React,{useState} from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { kabfiApp, firebase } from '../../database/config';

const ResetPassword = (props) => {
    const[oldPassword, setOldPassword] = useState('');
    const[newPassword, setNewPassword] = useState('');
    const [loader, setLoader] = useState(false);    

    function reauthenticate(oldPassword) {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, oldPassword);
        return user.reauthenticateWithCredential(cred);
    }

    function userResetPassword(){
        if(oldPassword !== '' && newPassword !== ''){
            reauthenticate(oldPassword).then(() => {
                var user = firebase.auth().currentUser;
                user.updatePassword(newPassword).then(() => {
                alert('Password Updated Successfully');
                }).catch((error) => { 
                    alert(error.message);
                });
            }).catch((error)=>{
                alert(error.message)
                // setLoader(false);
            })
        }
        else{
            alert("All Fields Are Required");
        }
    }

    return (
        <ScrollView style={styles.root}>
            <View style={styles.contentArea}>
                
                <View style={styles.lockImageContainer}>
                    <Image source={require('../../../assets/ProjectImages/big-lock-image.png')} style={styles.lockImage} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.textHeading}>Change Password</Text>                    
                </View>

                <View style={styles.buttonsContainer}>
                    <TextInput style={styles.emailInput} placeholder="Old Password" value={oldPassword} onChangeText={(e)=>setOldPassword(e)}  />
                    <TextInput style={[styles.emailInput,{marginTop:10}]} placeholder="New Password" value={newPassword} onChangeText={(e)=>setNewPassword(e)}  />
                    <TouchableOpacity style={styles.btn2} onPress={() => userResetPassword()}>
                        { 
                            loader ? 
                            <ActivityIndicator color={"red"} size={'small'} />
                            :                            
                            <Text style={styles.btn2Text}>Reset</Text>
                        }                                          
                    </TouchableOpacity>  
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        // alignItems:"center",
        backgroundColor:'white',
        flex: 1,
    },
    contentArea:{
        width:'100%',
        height:'100%',
        marginTop:'30%',
        paddingHorizontal:20,
        paddingVertical:10,    
    },
    lockImageContainer:{
        alignItems:'center'
    },
    lockImage:{
        width:110,
        height:130
    },
    textContainer:{
        marginTop:20,
        alignItems:'center'
    },
    textHeading:{
        fontSize:18,
        fontWeight:'bold'
    },
    textSimple:{
        marginTop:8,
        textAlign:'center',
        color:'#696969',
        fontSize:13,
        lineHeight:12
    },
    buttonsContainer:{
        marginTop:80
    },
    emailInput:{
        backgroundColor:'#FBFBFB',
        borderRadius:20,
        padding:13,
        // textAlign:'center'        
    },
    
    btn2:{
        marginTop:30,
        backgroundColor:'#FAB040',
        borderRadius:5,
        padding:13,
        alignItems:'center'
    },
    btn2Text:{
        color:'white'
    }
});


export default ResetPassword;