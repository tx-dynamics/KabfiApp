import React from 'react';
import StackNavigator from './StackNavigator';
import StackNavigatorAfter from './StackNavigatorAfter';
import { useLogin } from '../context/LoginProvider';

const CurrentNavigator = () => {
    const {isLoggedIn} = useLogin();
    return isLoggedIn ? <StackNavigatorAfter /> : <StackNavigator />
}

export default CurrentNavigator;