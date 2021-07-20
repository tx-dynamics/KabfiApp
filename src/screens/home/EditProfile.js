import React,{useState} from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TextInput, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import { kabfiApp, firebase } from '../../database/config';
import 'firebase/firestore';

const EditProfile = (props) => {
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[phoneNumber, setPhoneNumber] = useState('');
    const[email, setEmail] = useState('');
    const[city, setCity] = useState('');
    const[country, setCountry] = useState('');

    async function editProfileHandler(){
        try {
            let Details = {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                city: city,
                country: country,                
            };
            const loggedInUser = await AsyncStorage.getItem('@user');
            
            if (loggedInUser !== null) {
                await updateData('users', loggedInUser, Details)
            }
          } catch (error) {
            alert(error.message);
          }
    }

    async function updateData(collection, doc, jsonObject) {
        const dbh = firebase.firestore();
        await 
        dbh
          .collection(collection)
          .doc(doc)
          .update(jsonObject)
          .then(async () => {
            console.log('Document successfully written!');
            return true;
          })
          .catch(function(error) {
            console.error('Error writing document: ', error);
          });
      }

    return (
        <ScrollView style={styles.root}>
            <View style={styles.contentArea}>
                <View style={styles.imageContainer} >
                    <Image source={require('../../../assets/ProjectImages/users/user-large.png')} style={styles.image} />
                </View>
                
                <View style={styles.fieldContainer}>
                    <TouchableOpacity style={styles.iconContainer} onPress={ ()=> editProfileHandler()} >
                        <Image source={require('../../../assets/ProjectImages/users/profile/pencil-icon.png')} style={styles.icon}  />
                    </TouchableOpacity>
                    
                    <Text style={styles.label}>First Name</Text>
                    <TextInput value={firstName} onChangeText={(e)=>setFirstName(e)} style={styles.textField}/>
                </View>    

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput value={lastName} onChangeText={(e)=>setLastName(e)} style={styles.textField}/>
                </View> 

                {/* <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput value="12345678" style={styles.textField} secureTextEntry={true}/>
                </View>  */}

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput value={phoneNumber} onChangeText={(e)=>setPhoneNumber(e)} style={styles.textField}/>
                </View> 

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput value={email} style={styles.textField} editable={false}/>
                </View> 

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>City, State</Text>
                    <TextInput value={city} onChangeText={(e)=>setCity(e)} style={styles.textField}/>
                </View> 

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Country</Text>
                    <TextInput value={country} onChangeText={(e)=>setCountry(e)} style={styles.textField}/>
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
    },
    iconContainer:{
        width:50,
        height:30,
        position:'absolute',
        right:10,
        top:30,
        // backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        zIndex:1
    },
    icon:{
        height:20,
        width:20
        // width:20,
        // height:20,
        // position:'absolute',
        // right:0,
        // top:35,
        // backgroundColor:'red'
    }
});

export default EditProfile;