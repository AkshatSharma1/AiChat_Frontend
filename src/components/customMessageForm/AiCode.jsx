/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { useState } from 'react';
import MessageFormUi from './MessageFormUi'
import { usePostAiCodeMutation } from '@/state/api';

const AiCode = ({props, activeChat}) => {

    const [message, setMessage] = useState("")
    const [attachment, setAttachment] = useState("");

    //destructing object
    const [trigger] = usePostAiCodeMutation();
    const handleChange = (e) => setMessage(e.target.value);
    const handleSubmit = async ()=>{
        //on submit the mssg, we need few info like sender id, date etc
        const date = new Date().toISOString().replace("T", " ").replace("Z", `${Math.floor(Math.random()*1000)}-05:30`)

        const attach = attachment ? [{blob: attachment, file: attachment.name}] : []

        const form = {
            attachments: attach,
            created: date,
            sender_username: props.username,
            text: message,
            activeChat: activeChat.id
        }

        props.onSubmit(form);
        trigger(form);
        setMessage("")
        setAttachment("")
    }

  return (
    <MessageFormUi
        setAttachment={setAttachment}
        message={message}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
    />
  )
}

export default AiCode