import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import {noti, bell} from '../assets';
import theme from '../theme';
import {Fonts} from '../utils/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
const HeaderRight = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Notification')}
      style={{flexDirection: 'row', alignItems: 'center', right: 7}}>
      <ImageBackground
        source={bell}
        resizeMode={'contain'}
        style={{
          height: 26,
          width: 26,
          alignItems: 'flex-end',
          alignSelf: 'center',
          // backgroundColor: 'tomato',
        }}>
        <Image source={noti} style={{height: 8, width: 8, right: 5, top: 1}} />
      </ImageBackground>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    //fontFamily: Fonts.GoogleSansBold,
    color: theme.colors.primaryDark,
  },
});
export default HeaderRight;
