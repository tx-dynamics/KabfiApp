import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
const Landing = (props) => {
    return (
        <View style={styles.root}>
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

                    <TouchableOpacity style={styles.next} onPress={() => props.navigation.navigate('Signup')}>
                        <Text>NEXT</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles= StyleSheet.create({
    root:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor:'white'
    },
    coontentArea:{
        alignItems:'center'
    },
    imageContainer:{
        marginTop:'80%'
    },
    image:{
        width:120,
        height:120
    },
    textContainer:{
        marginTop:'40%',
        width:'70%'
    },
    text:{
        textAlign:'center',
        lineHeight:20
    },
    carouselContainer:{
        marginTop:'20%',
        flexDirection:'row',
        
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