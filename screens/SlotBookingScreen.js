import React from 'react'
import { StyleSheet, View } from 'react-native';
import {Datepicker, Icon, Layout, Text,Avatar,Drawer, DrawerItem, IndexPath,Button  } from '@ui-kitten/components';
import { useState } from 'react';

const data=["9:00 AM :10:00 AM","10:00 AM :11:00 AM","11:00 AM :12:00 PM","12:00 PM :1:00 PM","1:00 PM :2:00 PM","2:00 PM :3:00 PM","3:00 PM :4:00 PM"]

const SlotBookingScreen = ({navigation,route}) => {
    const [date, setDate] = useState(new Date()); 
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

    const CalendarIcon = (props) => (
        <Text>Pick Date</Text>
      );
    return (
        <Layout style={styles.container}>
            <Layout style={styles.doctorDetails} >
            <Layout style={styles.avatarview} level='2'>
            <Avatar style={styles.avatar} size='giant' source={{uri:"https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",}}/>
    </Layout>


    <Layout style={styles.doctorview} level='1'>
      <Layout>
          <Text category='h6'>{route.params.name}</Text>
      </Layout>
      <Layout>
      <Text appearance='hint'>{route.params.degree}</Text>
      </Layout>
      <Layout>
      <Text appearance='hint'>Doctor subtext</Text>
      </Layout>
    </Layout>
    </Layout>
    <Layout style={styles.datePicker}>
    <Datepicker
        // label='Label'
        // caption='Caption'
        placeholder='Pick Date'
        date={date}
        onSelect={nextDate => setDate(nextDate)}
       accessoryRight={CalendarIcon}
      />

    </Layout>
    <View style={{alignSelf:"center", margin:10}}>
        <Text category="h4">Slots Available</Text>
    </View>
    <Layout style={styles.slots}>
        
    <Drawer style={styles.drawer}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
          {data.map((slot)=>(
              <DrawerItem   style={styles.slot} title={slot}/>
          ))}
      
    </Drawer>
    
    </Layout>
    <View>
        {selectedIndex?(<Button style={styles.button}>
      CONFIRM BOOKING
    </Button>):<Button style={styles.button} disabled={true}>
      CONFIRM BOOKING
    </Button>}
    

    </View>
    
      
     
        </Layout>
    )
}

export default SlotBookingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#faf6ee",
        
        //flexDirection: 'row',
      },
      doctorDetails: {
          flexDirection:"row",
        height:120,
        
        
        // borderColor:"black",
        // borderWidth:1,
        borderRadius:5,
        margin:15,
        justifyContent: 'center',
        alignItems: 'center',
      },
      avatar: {
        margin: 8,
      },
      avatarview:{
          margin:8,
          backgroundColor:"#fff",
          
          
      },
      doctorview:{
          width:"75%",
          margin:5,
      },
      datePicker:{
          margin:20,
          marginHorizontal:35,
      },
      slots:{
        
        margin:30,
      },
      button: {
        marginHorizontal: 30,
      },
})
