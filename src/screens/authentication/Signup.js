import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { AntDesign, Ionicons  } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';

const Signup = (props) => {

    const [image, setImage] = useState(null);
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    return (
        <ScrollView style={styles.root}>
            <View style={styles.contentArea}>
                {/* <StatusBar style="dark" />              */}

                <View style={styles.logoContainer}>
                    {/* <TouchableOpacity onPress={() => props.navigation.navigate('Landing')}> */}
                        <AntDesign name="arrowleft" style={styles.topLeftArrow} onPress={() => props.navigation.navigate('Landing')} />
                    {/* </TouchableOpacity> */}
                    
                    <Image source={require('../../../assets/ProjectImages/logo-name.png')} style={styles.logoImage} />
                    <Text style={styles.createAccountText}>CREATE AN ACCOUNT</Text>
                </View>

                <View style={styles.form}>
                    
                    <View style={styles.formField}>
                        <Text style={styles.label}>Name</Text>
                        <View style={styles.textFieldHalfContainer}>
                            <TextInput style={styles.textFieldHalf} placeholder="First Name" />
                            <TextInput style={styles.textFieldHalf} placeholder="Last Name" />        
                        </View>
                    </View>

                    <View style={styles.formField}>
                        <Text style={styles.label}>Mobile Country</Text>
                        <Text style={styles.countryCode}>+44</Text>
                        <View style={styles.textFieldFullContainer}>
                            <TextInput style={[styles.textFieldFull, {paddingHorizontal:55}]} placeholder="777 777-777" />                            
                        </View>
                    </View>  

                    <View style={styles.formField}>
                        <Text style={styles.label}>E-mail</Text>
                        <View style={styles.textFieldFullContainer}>
                            <TextInput style={styles.textFieldFull} placeholder="name@example.com" />                            
                        </View>
                    </View>

                    <View style={styles.formField}>
                        <View style={styles.textFieldHalfContainer}>
                            <View style={styles.uploadImageFieldsContainer}>
                                <Text style={styles.uploadImageFieldLabel}>Badge Number image</Text>  
                                <Image source={require('../../../assets/ProjectImages/authentication/PhotoIcon.png')} style={styles.uploadIMageIcon} />                   
                                <TouchableOpacity onPress={pickImage}>
                                    <TextInput style={styles.uploadImageFields} placeholder="Upload Image"  editable={false} />
                                </TouchableOpacity>                                
                            </View>
                            <View style={styles.uploadImageFieldsContainer}>
                                <Text style={styles.uploadImageFieldLabel}>Taxi License image</Text> 

                                <Image source={require('../../../assets/ProjectImages/authentication/PhotoIcon.png')} style={styles.uploadIMageIcon} />                   
                                <TouchableOpacity onPress={pickImage}>
                                    <TextInput style={styles.uploadImageFields} placeholder="Upload Image"  editable={false} />
                                </TouchableOpacity>                                
                            </View>
                        </View>
                    </View>    

                    <View style={styles.formField}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.textFieldFullContainer}>
                            <TextInput style={styles.textFieldFull} secureTextEntry={true} />                            
                        </View>
                    </View>

                    <View style={{paddingHorizontal:20, marginTop:40 }}>
                        <Text style={{textAlign:'center', fontSize:12}}>
                            By clicking submit below you are agreeing to the Kabfi 
                            <Text style={styles.submitText}> Terms and consitions </Text>
                             and 
                            <Text style={styles.submitText}> Privacy Policy</Text>    
                        </Text>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => props.navigation.navigate('Signin')}>
                            <Text style={{color:'white'}}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>

                    <Text></Text>

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
        width:'100%',
        height:'100%',
        marginTop:'15%',
        paddingHorizontal:20,
        paddingVertical:10    
    },
    logoContainer:{
        alignItems:'center'
    },
    logoImage:{
        width:140, 
        height:30
    },
    topLeftArrow:{
        fontSize:24,
        color:'black',
        position:'absolute',
        left:0,
        top:5        
    },
    createAccountText:{
        marginTop:25,
        fontSize:17,
        fontWeight:'bold'
    },
    form:{
        marginTop:20
    },
    formField:{
        marginTop:20
    },  
    label:{
        
    },
    textFieldHalfContainer:{
        flexDirection:'row', 
        justifyContent:'space-between',
        marginTop:5
    },  
    textFieldFullContainer:{
        marginTop:5
    },
    textFieldHalf:{
        borderWidth:1,
        borderColor:'#E6E6E6',
        paddingHorizontal:20,
        paddingVertical:10,
        width:'48.5%',
        fontSize:13
    },
    textFieldFull:{
        borderWidth:1,
        borderColor:'#E6E6E6',
        paddingHorizontal:20,
        paddingVertical:10,
        fontSize:13
    },
    countryCode:{
        position:'absolute', 
        top:39, left:10
    },
    uploadImageFieldsContainer:{
        width:'48.5%'        
    },
    uploadImageFields:{
        borderWidth:1,
        borderColor:'#E6E6E6',
        paddingHorizontal:20,
        paddingVertical:10,  
        fontSize:13      
    },  
    uploadImageFieldLabel:{
        marginBottom:5,
        marginLeft:5
    },
    uploadIMageIcon:{
        // fontSize:18,
        // color:'#E6E6E6',
        width:15,
        height:15,
        position:'absolute',
        top:42,
        right:13
    },
    submitText:{
        color:'#FCD291'
    },
    loginBtn:{
        marginTop:40,
        backgroundColor:'#FAB040',
        alignItems:'center',
        padding:12,
        width:'95%',
        alignSelf:'center'
    },
});


export default Signup;