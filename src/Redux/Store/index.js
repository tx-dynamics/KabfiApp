import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore } from 'redux'
import rootReducers from '../Reducers/index'
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['AuthReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = createStore(persistedReducer);
const persistor = persistStore(store);
export {store, persistor};
