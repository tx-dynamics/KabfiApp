import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {drawer} from '../assets';
import theme from '../theme';
import {Fonts} from '../utils/Fonts';

const HeaderCenterComponent = ({name}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.textStyle}>{name}</Text>
    </View>
  );
};
export default HeaderCenterComponent;
export const styles = StyleSheet.create({
  textStyle: {
    fontSize: 19,
    fontFamily: Fonts.SFPRO,
    color: 'black',
    fontWeight: '500',
    alignSelf: 'center',
  },
});
