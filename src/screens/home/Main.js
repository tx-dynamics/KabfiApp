import React from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 

const Main = (props) => {
    return (
        <View style={styles.root}>            
           
                <View style={styles.contentArea}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.smallLine}></View>
                    
                    <View style={styles.userInfoContainer}>
                        <View style={styles.userInfo1}>
                            <Image source={require('../../../assets/ProjectImages/users/user.png')} style={styles.smallImage} /> 
                        </View>   
                        <View style={styles.userInfo2}>
                            <Text style={styles.userName}>JohnThompson</Text>
                            <View style={styles.userInfo2SubContainer}>
                                <Text style={styles.info2Text}>4.92</Text>
                                <FontAwesome name="star" style={styles.star} />
                            </View>
                        </View>   
                        <View style={styles.userInfo3}>
                            <Text style={styles.info3Text}>Member since 2021</Text>
                        </View>   
                    </View>


                    <View style={styles.listContainer}>
                        <TouchableOpacity style={styles.listItem} onPress={ () => props.navigation.navigate('EditProfile')} >
                            <Image source={require('../../../assets/ProjectImages/users/profile/edit-profile.png')} style={styles.listIconImage} />
                            <Text style={styles.listText}>Edit Profile</Text>                    
                        </TouchableOpacity>  
                        
                        <TouchableOpacity style={styles.listItem}>
                            <Image source={require('../../../assets/ProjectImages/users/profile/refer-taxi.png')} style={styles.listIconImage} />
                            <Text style={styles.listText}>Refer a taxicab driver</Text>                    
                        </TouchableOpacity>  

                        <TouchableOpacity style={styles.listItem}>
                            <Image source={require('../../../assets/ProjectImages/users/profile/hotspot.png')} style={styles.listIconImage} />
                            <Text style={styles.listText}>Hot spots</Text>                    
                        </TouchableOpacity>  

                        <TouchableOpacity style={styles.listItem}>
                            <Image source={require('../../../assets/ProjectImages/users/profile/saved-post.png')} style={styles.listIconImage} />
                            <Text style={styles.listText}>Saved Post</Text>                    
                        </TouchableOpacity>  

                        <TouchableOpacity style={styles.listItem} onPress={ () => props.navigation.navigate('Settings') }>
                            <Image source={require('../../../assets/ProjectImages/users/profile/settings.png')} style={styles.listIconImage} />
                            <Text style={styles.listText}>Settings</Text>                    
                        </TouchableOpacity>  

                        <TouchableOpacity style={styles.listItem}>
                            <Image source={require('../../../assets/ProjectImages/users/profile/feedback.png')} style={styles.listIconImage} />
                            <Text style={styles.listText}>Feedback</Text>                    
                        </TouchableOpacity>  

                        <TouchableOpacity style={styles.listItem}>
                            <Image source={require('../../../assets/ProjectImages/users/profile/help.png')} style={styles.listIconImage} />
                            <Text style={styles.listText}>Help</Text>                    
                        </TouchableOpacity>  

                        <TouchableOpacity style={styles.listItem}>
                            <Image source={require('../../../assets/ProjectImages/users/profile/legal.png')} style={styles.listIconImage} />
                            <Text style={styles.listText}>Legal</Text>                    
                        </TouchableOpacity>  
                        
                    </View>  
                </ScrollView>    
                </View>
           
        </View>
    );
}

const styles = StyleSheet.create({
    root:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor:'#777777',  
        flex:1, 
    },
    scroll:{
        // height:Dimensions.get('screen').height,
        // width:Dimensions.get('screen').width,
        marginBottom:10,
     
    },
    contentArea:{       
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        alignItems:'center',
        backgroundColor:'#FBFBFB',
        width:'100%',
        elevation:10,
        paddingLeft:25,
        position:'absolute',
        bottom:0,        
    },
    smallLine:{        
        height:2,
        width:20,
        backgroundColor:'#D6D6D6',
        alignSelf:'center',
        marginTop:10
    },
    userInfoContainer:{
        flexDirection:'row',
        marginTop:20
    },
    userInfo1:{        
        width:'20%',        
        alignItems:'center'
    },
    smallImage:{
        width:50,
        height:50
    },
    userInfo2:{
        width:'35%',
        paddingVertical:2,
        paddingHorizontal:5
    },
    userName:{
        fontSize:15,
        fontWeight:'bold',
        color:'#464646'
    },  
    userInfo2SubContainer:{
        flexDirection:'row', 
        alignItems:'center'
    },
    star:{
        fontSize:14,
        color:'#FAB040',
        marginLeft:5,
        marginTop:4
    },
    info2Text:{
        color:'#464646'
    },  
    userInfo3:{
        width:'45%',
        padding:4
    },
    info3Text:{
        color:'#464646',
        fontSize:12
    },
    listContainer:{
        marginTop:40,
        width:'100%'
    },  
    listItem:{        
        width:'100%',         
        flexDirection:'row', 
        paddingHorizontal:10, 
        paddingVertical:17, 
        borderBottomWidth:1, 
        borderBottomColor:'#EFEFEF',
        alignItems:'center'
    },
    listIconImage:{
        width:20,
        height:20
    },
    listText:{
        marginLeft:10,
        color:'#474747'
    }
});

export default Main;