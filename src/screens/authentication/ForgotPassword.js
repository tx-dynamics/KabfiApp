import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
const ForgotPassword = (props) => {
    return (
        <ScrollView style={styles.root}>
            <View style={styles.contentArea}>
                
                <View style={styles.lockImageContainer}>
                    <Image source={require('../../../assets/ProjectImages/big-lock-image.png')} style={styles.lockImage} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.textHeading}>Reset Password</Text>
                    <Text style={[styles.textSimple,{width:'80%'}]}>Enter the email associated with your account and</Text>
                    <Text style={styles.textSimple}> we'll send an email with instructions to reset your password.</Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <TextInput style={styles.emailInput} value="Email address"  />

                    <TouchableOpacity style={styles.btn2} onPress={() => props.navigation.navigate('SendEmail')}>
                        <Text style={styles.btn2Text}>Send Password</Text>
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
        backgroundColor:'white'
    },
    contentArea:{
        width:'100%',
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
        textAlign:'center'        
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


export default ForgotPassword;