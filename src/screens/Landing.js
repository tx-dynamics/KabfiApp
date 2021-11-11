import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity,ScrollView } from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Landing = (props) => {
    return (
        <View style={styles.root}>
           {/* <ScrollView> */}
            <View style={styles.coontentArea}>
               
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/ProjectImages/logo.png')} style={styles.image} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>We believe in revolutionising the way people communicate</Text>
                </View>

                <View style={styles.carouselContainer}>
                    <TouchableOpacity style={styles.skip}>
                        <Text>SKIP</Text>
                    </TouchableOpacity>

                    <View style={styles.dots}>
                        <View style={[styles.dot, {backgroundColor:'#FAB040'}]}></View>
                        <View style={styles.dot}></View>
                        <View style={styles.dot}></View>
                        <View style={styles.dot}></View>
                    </View>

                    <TouchableOpacity style={styles.next} onPress={
                        () => 
                        props.navigation.navigate('Signup')
                        }>
                        <Text>NEXT</Text>
                    </TouchableOpacity>
                </View>
               
            </View>
            {/* </ScrollView> */}
        </View>
    );
}

const styles= StyleSheet.create({
    root:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor:'white',
        flex: 1,
    },
    coontentArea:{
        alignItems:'center',
        alignSelf:'center',
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignContent:'center',
        
    },
    imageContainer:{
        //marginTop:'80%'
    },
    image:{
        width:120,
        height:120
    },
    textContainer:{
       // marginTop:'40%',
        width:'70%',
        position:'absolute',
        bottom:70,
    },
    text:{
        textAlign:'center',
        lineHeight:20
    },
    carouselContainer:{
       // marginTop:'20%',
        flexDirection:'row',
        position:'absolute',
        bottom:20,
        
    },
    skip:{
        width:'30%',
        // backgroundColor:'orange',
        alignItems:'center'
    },
    dots:{
        width:'40%',
        // backgroundColor:'yellow',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',        
    },
    dot:{
        width:8,
        height:8,
        backgroundColor:'#FBC36F',
        borderRadius:50,
        marginRight:10
        // borderColor:'red',
        // borderWidth:1
    },
    next:{
        width:'30%',
        // backgroundColor:'blue',
        alignItems:'center'
    }
});

export default Landing;