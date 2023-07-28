// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useState } from 'react'
import {XMarkIcon, PaperClipIcon, PaperAirplaneIcon} from "@heroicons/react/24/solid"
import Dropzone from 'react-dropzone';


const MessageFormUi = ({
    setAttachment, 
    message, 
    handleSubmit,
    handleChange,
    appendText,
    handleKeyDown
}) => {

    const [preview, setPreview] = useState("")

  return (
    <div className='message-form-container'>
        {/* Now if preview is avaible then render this */}
        {preview && (
            <div className='message-form-preview'>
                <img alt="preview" className='message-form-preview-image' src={preview} onLoad={()=>URL.revokeObjectURL(preview)}/> 

                <XMarkIcon 
                    className='message-form-icon-x'
                    // on clicking remove the preview and attachment
                    onClick={()=>{
                        setPreview("")
                        setAttachment("")
                    }}
                />
            </div>
        )}

        {/* need a message form */}
        <div className='message-form'>
            {/* input div */}
            <div className='message-form-input-container'>
                <input 
                    className='message-form-input'
                    type='text'
                    value={message}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder='Send a message...'
                />
                {appendText && (
                    <input               
                        className='message-form-assist'
                        type='text'
                        disabled='disabled'
                        value={`${message} ${appendText}`}
                    
                    />
                )}
            </div>

            {/* div for send icon */}
            <div className='message-form-icons'>
                <Dropzone 
                    acceptedFiles = ".jpg .jpeg .png"
                    multiple={false}
                    noClick={true}
                    onDrop={(acceptedFiles)=>{
                        setAttachment(acceptedFiles[0])
                        setPreview(URL.createObjectURL(acceptedFiles[0]))
                    }}
                >
                    {/* dropzone working */}
                    {({getRootProps, getInputProps, open})=>(
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <PaperClipIcon 
                                className="message-form-icon-clip"
                                onClick={open}
                            />
                        </div>
                    )}
                </Dropzone>
                <hr className='vertical-line'/>
                <PaperAirplaneIcon 
                    className="message-form-icon-airplane"
                    onClick = {()=>{
                        setPreview("")
                        handleSubmit();
                    }}
                />
            </div>
        </div>
    </div>
  )
}

export default MessageFormUi