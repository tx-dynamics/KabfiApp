import React,{useEffect, useState} from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TextInput, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
// import { kabfiApp, firebase } from '../../database/config';
import firebase from 'firebase';
import { Header } from "react-native-elements";
import {user2} from '../../../assets'
import HeaderCenterComponent from '../../components/HeaderCenterComponent';
import * as ImagePicker from "expo-image-picker";

const EditProfile = (props) => {
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[mobileNo, setMobileNo] = useState('');
    const[email, setEmail] = useState('');
    const[city, setCity] = useState('');
    const[country, setCountry] = useState('');
    const [Dp,setDp]=useState('')
    useEffect(()=>{
        const user = firebase.auth().currentUser?.uid;
        const data = firebase.database().ref('users/'+user);
        data.on('value',userdata=>{
        setFirstName(userdata.val().firstName)
        setLastName(userdata.val().lastName)
        setMobileNo(userdata.val().mobileNo)
        setCity(userdata.val().city)
        setCountry(userdata.val().country)
        setEmail(userdata.val().email)
        setDp(userdata.val().Dp)
        })
    },[])

    async function editProfileHandler(){
        try {
            let Details = {
                firstName: firstName,
                lastName: lastName,
                mobileNo: mobileNo,
                city: city,
                country: country,  
                Dp:Dp              
            };
            
            const user = await firebase.auth().currentUser.uid;
            const data = await firebase.database().ref('users/'+user).update(Details);            
            alert("Data Updated Succsessfully");
            
          } catch (error) {
            alert(error.message);
          }
    }

    const pickDpImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setDp(result.uri);
        //   alert("Profile Image Selected");
        }
      };

    return (
        <ScrollView style={styles.root}>
             <Header
        backgroundColor="white"
        containerStyle={{ marginTop: 15, paddingHorizontal:20 }}
        leftComponent={
            <TouchableOpacity onPress={()=> props.navigation.goBack()}>
              <Text style={{color:'blue'}}>Back</Text>
            </TouchableOpacity>
        }
        centerComponent={
            <Text>Edit Profile</Text>            
        }
        rightComponent={
            <TouchableOpacity onPress={ ()=> editProfileHandler()} >
              <Text>Save</Text>
            </TouchableOpacity>
        }
      />
            <View style={styles.contentArea}>

                <TouchableOpacity style={styles.imageContainer} onPress={pickDpImage} >
                    <Image source={Dp?{uri:Dp}:user2} style={styles.image} />
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={pickDpImage}>
                  <TextInput
                    style={styles.uploadImageFields}
                    placeholder="Upload Image"
                    editable={false}
                  />
                </TouchableOpacity>     */}



                
                <View style={styles.fieldContainer}>
                    {/* <View style={styles.iconContainer}  >
                        <Image source={require('../../../assets/ProjectImages/users/profile/pencil-icon.png')} style={styles.icon}  />
                    </View> */}
                    
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
                    <TextInput value={mobileNo} onChangeText={(e)=>setMobileNo(e)} style={styles.textField}/>
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
        height:100,
        borderRadius:50
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