import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
const SendEmail = (props) => {
    return (
        <ScrollView style={styles.root}>
            <View style={styles.contentArea}>
                
                <View style={styles.lockImageContainer}>
                    <Image source={require('../../../assets/ProjectImages/big-lock-image.png')} style={styles.lockImage} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.textHeading}>Check your email</Text>
                    <Text style={styles.textSimple}>We have sent a password recover</Text>
                    <Text style={styles.textSimple}> instructions to your email</Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.btn2} onPress={() => props.navigation.navigate('Signin')}>
                        <Text style={styles.btn2Text}>Back</Text>
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
        height:'100%',
        marginTop:'50%',
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
        marginTop:10,
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
        marginTop:20
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


export default SendEmail;