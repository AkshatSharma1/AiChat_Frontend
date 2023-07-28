/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from 'react-chat-engine-advanced';

import CustomHeader from "@/components/CustomHeader"

import StandardMessageForm from "@/components/customMessageForm/StandardMessageForm"

import Ai from '../customMessageForm/Ai';
import AiCode from '../customMessageForm/AiCode';
import AiAssist from '../customMessageForm/AiAssist';

const Chat = ({user , secret}) => {

    //setting up chat props
    const chatProps = useMultiChatLogic(
        import.meta.env.VITE_PROJECT_ID,
        user,
        secret
    )

  return (
    //get complete window
    <div style={{flexBasis: "100%"}}>
        <MultiChatSocket {...chatProps} />
        <MultiChatWindow
            {...chatProps}
            style={{height:"100vh"}}
            renderChatHeader={(chat)=><CustomHeader chat={chat} />}
            renderMessageForm={(props)=>{

                if(chatProps.chat?.title.startsWith("AiChat_")){
                    return <Ai props={props} activeChat={chatProps.chat} />
                }

                if(chatProps.chat?.title.startsWith("AiCode_")){
                    return <AiCode props={props} activeChat={chatProps.chat} />
                }

                if (chatProps.chat?.title.startsWith("AiAssist_")) {
                    return <AiAssist props={props} activeChat={chatProps.chat} />;
                  }

                return(
                    <StandardMessageForm props={props} activeChat = {chatProps.chat} />
                )
            }}
        />
    </div>
  )
};

export default Chat;