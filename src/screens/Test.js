// import React,{useState} from 'react'
// import { View, Text, TextInput, Button } from 'react-native'

// import kabfiApp from '../database/config';
// const table_todo = kabfiApp.database().ref('/ToDo');

// const Test = (props) => {
//     const[text, setText] = useState('');
    
//     function addHandle(){
//         table_todo.push({ text });        
//       }

//     return (
//         <View style={{alignItems:'center', justifyContent:'center', flex:1 }}>
//             <View style={{ width:'90%'}}>
//                 <TextInput style={{borderWidth:1, borderColor:'black'}} onChangeText={(e)=>setText(e)} />
//                 <Button title="Click me" onPress={addHandle} />    
//                 <Text>{text}</Text>            
//             </View>
//         </View>
//     );
// }

// export default Test;