import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    LayoutAnimation,
    Image,
    ScrollView,
    Animated
} from 'react-native';
//import RNSoundLevel from 'react-native-sound-level'
export default class AudioRecording extends Component {
    state = {
        isPressed: false,
        animated: new Animated.Value(0),
        opacityA: new Animated.Value(1),
    }
    constructor(props) {
        super(props);
        this._onPress = this._onPress.bind(this);
    }
    // componentDidMount() {
    //     RNSoundLevel.start()
    //     RNSoundLevel.onNewFrame = (data) => {
    //       // see "Returned data" section below
    //       console.log('Sound level info', data)
    //     }
    //   }
      
    //   // don't forget to stop it
    //   componentWillUnmount() {
    //     RNSoundLevel.stop()
    //   }

    _runAnimation() {
        const { animated, opacityA } = this.state;

        Animated.loop(
            Animated.parallel([
                Animated.timing(animated, {
                    toValue: 1,
                    duration: 1000,

                }),
                Animated.timing(opacityA, {
                    toValue: 0,
                    duration: 1000,

                })
            ])
        ).start();
    }
    _stopAnimation() {
        Animated.loop(
            Animated.parallel([
                Animated.timing(animated),
                Animated.timing(opacityA)
            ])
        ).stop();
    }
    _onPress() {
        this.setState(
            state => ({ isPressed: !state.isPressed }),
        )
    }
    _micButton() {
        const { isPressed, animated, opacityA, } = this.state;
        if (isPressed) {
            //some function
            this._runAnimation();
            return (
                <Animated.View style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: 'rgba(153,0,0,0.4)',
                    opacity: opacityA,
                    transform: [
                        {
                            scale: animated
                        }
                    ]
                }}>
                    {/* icon or image */}
                </Animated.View>
            );
        } else {
            //some function
            return (
                <View style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: 'rgba(153,0,0,0.4)',
                }}>
                    {/* icon or image */}
                </View>
            );
        }
    }





    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._onPress}>
                    {this._micButton()}
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

});

// import React, { Component } from "react";
// import { AppRegistry, PermissionsAndroid, Platform } from "react-native";
// import WebView from "react-native-webview";
// import Recording from "react-native-recording";

// class AudioRecording extends Component {
//   async componentDidMount() {
//     if (Platform.OS === "android") {
//       await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//       ]);
//     }

//     Recording.init({
//       bufferSize: 4096,
//       sampleRate: 44100,
//       bitsPerChannel: 16,
//       channelsPerFrame: 1,
//     });

//     this.listener = Recording.addRecordingEventListener((data) => {
//       if (this.loaded) {
//         this.webView.injectJavaScript(`
//           waveform.update("${data}".split(",").map(function (value) {
//             return parseInt(value)
//           }));
//           true;
//         `);
//       }
//     });

//     Recording.start();
//   }

//   componentWillUnmount() {
//     this.listener.remove();
//     Recording.stop();
//   }

//   render() {
//     return (
//       <WebView
//         ref={(ref) => (this.webView = ref)}
//         style={{ flex: 1 }}
//         onLoad={() => (this.loaded = true)}
//         source={{
//           html: `<!doctype html>
// <meta name="viewport" content="width=device-width, user-scalable=no">
// <style>
// html {
//   height: 100%;
// }
// body {
//   height: 100%;
//   margin: 0;
//   overflow: hidden;
// }
// canvas {
//   display: block;
//   width: 100%;
//   height: 100%;
// }
// </style>
// <canvas id="canvas"></canvas>
// <script>
// const Waveform = function (selector) {
//   this.canvas = document.querySelector(selector)
//   this.canvas.width = document.body.clientWidth * window.devicePixelRatio
//   this.canvas.height = document.body.clientHeight * window.devicePixelRatio
//   this.context = this.canvas.getContext('2d')
//   this.context.strokeStyle = '#34495e'
// }
// Waveform.prototype.update = function (data) {
//   const slice = this.canvas.width / (data.length - 1)
//   this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
//   this.context.beginPath()
//   data.reduce((function (x, value, index) {
//     const y = (0.5 + value / 16384) * this.canvas.height
//     if (index > 0) {
//       this.context.lineTo(x, y)
//     } else {
//       this.context.moveTo(x, y)
//     }
//     return x + slice
//   }).bind(this), 0)
//   this.context.stroke()
// }
// window.waveform = new Waveform('#canvas')
// document.ontouchmove = function (event) {
//   event.preventDefault()
// }
// </script>`,
//         }}
//       />
//     );
//   }
// }

// AppRegistry.registerComponent("RNRecording", () => react-native-webview);