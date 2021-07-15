import React from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview';

const TermsAndConditions = (props) => {
    return (
        <WebView
            source={{ uri: 'https://google.com/' }}            
        />
    );
}

export default TermsAndConditions;