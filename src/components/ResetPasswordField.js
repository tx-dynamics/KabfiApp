import React,{useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Ionicons } from "@expo/vector-icons";

const ResetPasswordField = (props) => {
    const [password, setPassword] = useState("");
    const [passwordHidden, setPasswordHidden] = useState(true);

    function passwordVisibility() {
        passwordHidden === true
          ? setPasswordHidden(false)
          : setPasswordHidden(true);
      }

    return (
        <View>
            {/* <Text style={styles.label}>Password</Text> */}
           
            <View style={styles.textFieldFullContainer}>
                <TouchableOpacity style={styles.eyeIconContainer} onPress={ passwordVisibility } >
                    <Ionicons name="eye" style={styles.eyeIcon}  />
                </TouchableOpacity>
                
                <TextInput style={props.style} value={password} onChangeText={(e)=>setPassword(e)} secureTextEntry={passwordHidden} />                            
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textFieldFull:{
        borderWidth:1,
        borderColor:'#E6E6E6',
        paddingHorizontal:20,
        paddingVertical:10,
        fontSize:13
    },
    
    eyeIcon:{
        fontSize:24,
        color:'#E6E6E6',        
    },
    
    eyeIconContainer:{
        position:'absolute',
        top:13,
        right:13,
        width:35,
        height:25,
        alignItems:'center',
        zIndex:1
    }
    
})

export default ResetPasswordField;