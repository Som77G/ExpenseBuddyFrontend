import {Grid, GridItem, Tabs} from '@chakra-ui/react'
import ChakraWrapperDark from '../context/ChakraWrapperDark'
import ChakraWrapperLight from '../context/ChakraWrapperLight'
import FriendsSidebar from './FriendsSidebar'
import Chat from './Chat'
import { createContext, useEffect, useState } from 'react'
import UseSocketSetup from '../hooks/UseSocketSetup'
import { useAuthContext } from '../hooks/useAuthContext'
import {useTheme} from '@mui/material/styles'
// import io from 'socket.io-client'

// const socket= io.connect("https://expensebuddybackend.onrender.com")
export const FriendContext= createContext();
export const MessageContext= createContext();
const Friends= ()=>{
    const [friendList, setFriendList]= useState([]);
    const [messages, setMessages]= useState([]);
    const {user}= useAuthContext();
    const userid= user && user.userid;
    const [friendIndex, setFriendIndex]= useState(0);
    const theme= useTheme();
    const isDarkMode= theme.palette.mode === 'dark';
    const ChakraWrapper= isDarkMode ? ChakraWrapperDark: ChakraWrapperLight;
    useEffect(()=>{
      const fetchFriends= async ()=>{
        const response = await fetch('https://expensebuddybackend.onrender.com/api/friends', {
         headers: {'userid': `${userid}`}
    })
     const json= await response.json();
       
       setFriendList(json);
       console.log("friendList: ", friendList);
      }
      if(user){
        fetchFriends();
      }
      
    }, [user]);
    useEffect(()=>{
      const fetchMessages= async ()=>{
        const response = await fetch('https://expensebuddybackend.onrender.com/api/messages', {
         headers: {'userid': `${userid}`}
    })
     const json= await response.json();
       
       setMessages(json);
       console.log("Messages: ", messages);
      }
      if(user){
        fetchMessages();
      }
      
    }, [user]);
    UseSocketSetup(setFriendList, setMessages);
    return (
       <FriendContext.Provider value= {{friendList, setFriendList}}>
       <ChakraWrapper>
         <Grid templateColumns="repeat(10, 1fr)" h="100vh" as={Tabs} onChange={index => setFriendIndex(index)}>
        <GridItem colSpan="3" borderRight="2px solid gray">
          <FriendsSidebar />
        </GridItem>
        <GridItem colSpan="7" maxH="100vh">
          <MessageContext.Provider value ={{messages, setMessages}}>
            <Chat  userid={friendList.length > 0 && friendList[friendIndex] && friendList[friendIndex].userid} />
          </MessageContext.Provider>
        </GridItem>
      </Grid>
        </ChakraWrapper>
        </FriendContext.Provider>
    )
}

export default Friends
