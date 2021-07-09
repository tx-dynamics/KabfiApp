import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
const EditProfile = (props) => {
    return (
        <View style={styles.root}>
            <View style={styles.contentArea}>
                <View style={styles.imageContainer}>
                    <Image source={require('../../../assets/ProjectImages/users/user-large.png')} style={styles.image} />
                </View>
            </View>
            <Text style={styles.contentArea}>Hello edit</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    root:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor:'white'
    },
    contentArea:{
        marginTop:'10%',
        alignItems:'center',
        width:'100%', 
        height:'100%'       
    },
    imageContainer:{
        width:'100%',
        alignItems:'center'
    },
    image:{
        width:110,
        height:100
    }
});

export default EditProfile;