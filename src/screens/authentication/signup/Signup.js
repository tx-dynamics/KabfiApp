import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { AntDesign, Ionicons  } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { kabfiApp, firebase } from '../../../database/config';
import styles from './styles';

import 'firebase/firestore';


const Signup = (props) => {

    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[mobileNo, setMobileNo] = useState('');
    const[password, setPassword] = useState('');
    
    const [badgeNumberImage, setBadgeNumberImage] = useState(null);
    const [taxiLicenseImage, setTaxiLicenseImage] = useState(true);    
    const [passwordHidden, setPasswordHidden] = useState(true);    

    const [loader, setLoader] = useState(false);    

    const pickBadgeNumberImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setBadgeNumberImage(result);
          alert("Badge Number Selected");
        }
      }

    
    const pickTaxiLicenseImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setTaxiLicenseImage(result);
          alert("Taxi License Selected");
        }
      }


    function passwordVisibility(){
        (passwordHidden === true) ? setPasswordHidden(false) : setPasswordHidden(true);        
    }

      
    async function userSignup(){    
        
        let success = true;
        if(firstName !== '' && lastName !== '' && mobileNo !== "" && email !== "" && password !== "" && badgeNumberImage !== "" && taxiLicenseImage !== "" ){
          
          if(!/^[0-9]+$/.test(mobileNo)){
            alert("Phone number should be numeric only.");
            return false;
          }

          await firebase.auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async (user) => {
            
            let badgeImage = await uploadImage(badgeNumberImage.uri, Math.floor((Math.random() * 5000000) * (Math.random() * 5000000)) );
            let taxiLicense = await uploadImage(taxiLicenseImage.uri, Math.floor((Math.random() * 5000000) * (Math.random() * 5000000)) );
            
            let Details = {
              id: user.user.uid,
              firstName: firstName,
              lastName: lastName,
              email: email,
              mobileNo: mobileNo,
              badgeNumberImage: badgeImage,
              taxiLicenseImage:taxiLicense,
              rating: 0,
            };
            await saveData('users', user.user.uid, Details);
            alert('Thank you for your registration! Your account is now ready to use.');
            setFirstName('');
            setLastName('');
            setMobileNo('');
            setEmail('');
            setPassword('');
            setTaxiLicenseImage('');
            setBadgeNumberImage('');
            props.navigation.navigate('Signin');
          })
          .catch(function (error) {
            success = false;
            alert(error.code + ':: ' + error.message);
          });
        }
        else{
            alert('All Fields are required');
        }   
          
        
           
        return success;     
    }

    uploadImage = async (uri, imageName) => {
        try {
            setLoader(true);
            const response = await fetch(uri);
            const blob = await response.blob();
            var ref = firebase.storage().ref().child(`images/${imageName}`);
            const task = ref.put(blob);
            
            return new Promise((resolve, reject) => {
              task.on(
                'state_changed',
                () => {},
                err => {
                  reject(err);
                },
                async () => {
                  const url = await task.snapshot.ref.getDownloadURL();
                  resolve(url);
                  setLoader(false);
                },
              );
            });
          } catch (err) {
            console.log('uploadImage error: ' + err.message);
          }
    }

    async function saveData(collection, doc, jsonObject) {
        const dbh = firebase.firestore();
        await dbh
          .collection(collection)
          .doc(doc)
          .set(jsonObject, { merge: true })
          .then(function () {
            console.log("Document successfully written!");
            return true;
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
            return false;
          });
      }
          
    return (        
        <ScrollView style={styles.root}>            
            <View style={styles.contentArea}>
                
                <View style={styles.logoContainer}>
                
                    <Image source={require('../../../../assets/ProjectImages/logo-name.png')} style={styles.logoImage} />
                    <Text style={styles.createAccountText}>CREATE AN ACCOUNT</Text>
                
                </View>

                <View style={styles.form}>
                    
                    <View style={styles.formField}>
                        <Text style={styles.label}>Name</Text>
                        <View style={styles.textFieldHalfContainer}>
                            <TextInput style={styles.textFieldHalf} value={firstName} onChangeText={(e)=>setFirstName(e)} placeholder="First Name" />
                            <TextInput style={styles.textFieldHalf} value={lastName} onChangeText={(e)=>setLastName(e)} placeholder="Last Name" />        
                        </View>
                    </View>

                    <View style={styles.formField}>
                        <Text style={styles.label}>Mobile Country</Text>
                        <Text style={styles.countryCode}>+44</Text>
                        <View style={styles.textFieldFullContainer}>
                            <TextInput style={[styles.textFieldFull, {paddingHorizontal:55}]} value={mobileNo} onChangeText={(e)=>setMobileNo(e)}  placeholder="777 777-777" />                            
                        </View>
                    </View>  

                    <View style={styles.formField}>
                        <Text style={styles.label}>E-mail</Text>
                        <View style={styles.textFieldFullContainer}>
                            <TextInput style={styles.textFieldFull} value={email} onChangeText={(e)=>setEmail(e)} placeholder="name@example.com" />                            
                        </View>
                    </View>

                    <View style={styles.formField}>
                        <View style={styles.textFieldHalfContainer}>
                            <View style={styles.uploadImageFieldsContainer}>
                                <Text style={styles.uploadImageFieldLabel}>Badge Number</Text>  
                                <Image source={require('../../../../assets/ProjectImages/authentication/PhotoIcon.png')} style={styles.uploadIMageIcon} />                   
                                <TouchableOpacity onPress={pickBadgeNumberImage}>
                                    <TextInput style={styles.uploadImageFields} placeholder="Upload Image"  editable={false} />
                                </TouchableOpacity>                                
                            </View>
                            <View style={styles.uploadImageFieldsContainer}>
                                <Text style={styles.uploadImageFieldLabel}>Taxi License</Text> 

                                <Image source={require('../../../../assets/ProjectImages/authentication/PhotoIcon.png')} style={styles.uploadIMageIcon} />                   
                                <TouchableOpacity onPress={pickTaxiLicenseImage}>
                                    <TextInput style={styles.uploadImageFields} placeholder="Upload Image"  editable={false} />
                                </TouchableOpacity>                                
                            </View>
                        </View>
                    </View>    

                    <View style={styles.formField}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.textFieldFullContainer}>
                            
                           {/* start */}

                                
                            <TouchableOpacity style={styles.eyeIconContainer} onPress={ passwordVisibility } >
                                <Ionicons name="eye" style={styles.eyeIcon}  />
                            </TouchableOpacity>
                            
                            <TextInput style={styles.textFieldFull} value={password} onChangeText={(e)=>setPassword(e)} secureTextEntry={passwordHidden} />                            

                           
                            {/* end */}                            
                        </View>
                    </View>

                    <View style={{paddingHorizontal:20, marginTop:40 }}>
                        <Text style={{textAlign:'center', fontSize:12}}>
                            By clicking submit below you are agreeing to the Kabfi 
                            <Text style={styles.submitText} onPress={() => props.navigation.navigate('TermsAndConditions')}> Terms and conditions </Text>
                             and 
                            <Text style={styles.submitText} onPress={() => props.navigation.navigate('PrivacyPolicy')}> Privacy Policy</Text>                               
                        </Text>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => userSignup()}>
                           { loader ? 
                                <ActivityIndicator color={"red"} size={'small'} />
                                :
                            
                            <Text style={{color:'white'}}>SIGN UP</Text> }
                        </TouchableOpacity>
                    </View>

                    <Text></Text>

                </View>
            </View>
        </ScrollView>        
    );
}

export default Signup;

