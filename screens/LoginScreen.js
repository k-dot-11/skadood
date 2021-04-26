import React from 'react'
import { useState,useEffect } from 'react';
import { TouchableWithoutFeedback,TouchableOpacity, StyleSheet, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import {Button, Input, Layout,Icon,Text } from '@ui-kitten/components';



const LoginScreen = ({navigation},props) => {
    
  
    const [user, setUser] = useState();
    const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = () => {
    const [name, setName] = React.useState('');
        React.useEffect(() => {
              setName('test');
        });
        return(
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );}
  const MyHookComponent = () => {
    const [name, setName] = React.useState('');
    React.useEffect(() => {
          setName('test');
    });

    return <TouchableWithoutFeedback onPress={toggleSecureEntry}>
    <Text>{secureTextEntry ? 'eye-off' : 'eye'}</Text>
  </TouchableWithoutFeedback>;
};


    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
     
    }

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged((authUser)=>{
            console.log(authUser);
           
            if(authUser){
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    },[user])

    const signIn= ()=>{
        
    auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      setUser(res.user);
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    });

    }



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Layout style={styles.container} level='1'>
            <View style={styles.space}></View>                
      <Input
        style={styles.input}
        value={email}
        autoFocus
        placeholder='Email'
      //  accessoryLeft={<Icon {...props} name='email'/>}
        onChangeText={value => setEmail(value)}
      />
      <Input
        style={styles.input}
        value={password}
        placeholder='Password'
        secureTextEntry={secureTextEntry}
      // accessoryLeft={<Icon {...props} name='password'/>}
       accessoryRight={MyHookComponent}
        type="password"
        onChangeText={value => setPassword(value)}
      />
             <Button onPress={signIn} style={styles.button} status='primary' >
      Login
    </Button>
    <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>
      <Text style={styles.signupHeader}>New To MedMeet! Signup Now</Text>

    <Button  onPress={()=>navigation.navigate("Home")} containerStyle={styles.button} style={styles.button} status='danger' >
        Sign Up
    </Button>

    
            </Layout>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    // space:{
    //     height:0,
    // },
    container: {
        
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        
      },
      input: {
        //flex: 1,
        margin: 10,
        
      },
      button:{
        marginTop: 10,
        width:390,
      },
      forgotButton: {
        marginTop: 15,
        marginRight:15,
        alignSelf:"flex-end",
        marginBottom: 35,
      },
      navButtonText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'Lato-Regular',
      },
      signupHeader:{
        fontSize:18,
        fontWeight: '900',
        opacity:0.75,
        margin:15,
        fontFamily: 'Lato-Regular',

      }
})
