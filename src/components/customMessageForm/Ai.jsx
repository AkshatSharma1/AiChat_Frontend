import React from 'react'
import { useState } from 'react';
import MessageFormUi from './MessageFormUi'
import { usePostAiTextMutation } from '@/state/api';

const Ai = ({props, activeChat}) => {

    const [message, setMessage] = useState("")
    const [attachment, setAttachment] = useState("");

    //destructing object
    const [trigger] = usePostAiTextMutation();
    const handleChange = (e) => setMessage(e.target.value);
    
    const handleSubmit = async ()=>{
        //on submit the mssg, we need few info like sender id, date etc
        const date = new Date().toISOString().replace("T", " ").replace("Z", `${Math.floor(Math.random()*1000)}+00:00`)

        const attach = attachment ? [{blob: attachment, file: attachment.name}] : []

        const form = {
            attachments: attach,
            created: date,
            sender_username: props.username,
            text: message,
            activeChat: activeChat.id
        }
        console.log(form)
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

export default Ai