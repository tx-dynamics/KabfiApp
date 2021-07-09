import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TextInput, ScrollView } from 'react-native'
const EditProfile = (props) => {
    return (
        <ScrollView style={styles.root}>
            <View style={styles.contentArea}>
                <View style={styles.imageContainer}>
                    <Image source={require('../../../assets/ProjectImages/users/user-large.png')} style={styles.image} />
                </View>
                
                <View style={styles.fieldContainer}>
                    
                    <Text style={styles.label}>First Name</Text>
                    <TextInput value="John" style={styles.textField}/>
                </View>    

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput value="Thompson" style={styles.textField}/>
                </View> 

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput value="12345678" style={styles.textField} secureTextEntry={true}/>
                </View> 

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput value="+44 77 000 00 00 000" style={styles.textField}/>
                </View> 

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput value="user@gmail.com" style={styles.textField}/>
                </View> 

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>City, State</Text>
                    <TextInput value="London" style={styles.textField}/>
                </View> 

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Country</Text>
                    <TextInput value="United Kingdom" style={styles.textField}/>
                </View>    

            </View>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor:'white',
        flex: 1,
    },
    contentArea:{
        marginTop:'10%',
        alignItems:'center',
        width:'100%', 
        height:'100%',
        paddingHorizontal:30       
    },
    imageContainer:{
        width:'100%',        
        alignItems:'center'
    },
    image:{
        width:110,
        height:100
    },
    fieldContainer:{
        marginTop:30,
        width:'100%',
        // backgroundColor:'orange'
    },
    label:{
        color:'#D7D7D7'
        // width:'100%',
        // backgroundColor:'yellow'
    },
    textField:{
        marginTop:5,
        borderBottomWidth:1,
        borderBottomColor:'#D7D7D7',
        paddingHorizontal:10,
        paddingVertical:5
    }
});

export default EditProfile;