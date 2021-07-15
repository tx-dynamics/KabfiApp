import React from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview';

const PrivacyPolicy = (props) => {
    return (
        <WebView
            source={{ uri: 'https://google.com/' }}   
            style={{marginTop:30,marginTop:50}}         
        />
    );
}

export default PrivacyPolicy;