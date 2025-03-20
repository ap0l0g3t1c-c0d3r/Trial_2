import {useState, useRef } from 'react'
import { useChatStore } from '../Store/useChatStore.js'
import {X} from "lucide-react"

const MessageInput = () => {
  
  const [text, setText] = useState("false")
  const [imagePreview, setImagePreview] = useState("false")
  const fileInputRef = useRef(null)
  const {sendMessages} = useChatStore()

  //to check for the image
  const handleImageChange = (e) => {

  }

  const removeImage = () => {

  }

  const handleSendMessage = async(e) => {

  }

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>)}
        
        <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
          <div className='flex flex-1 gap-2'>
            < input type="text" 
              className='w-full input input-bordered rounded-lg input-sm sm:input-md'
              placeholder='Type a message...'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <input type="file" accept='image/*' 
            className='hidden' 
            ref={fileInputRef}  onChange={handleImageChange} />
          </div>
        </form>

        <button type="button"
        className={`hidden sm:flex btn btn-circle 
        ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`} 
        onClick={() => fileInputRef.current?.click()}>
          <Image size={20}/>
        </button>

    </div>  
  
  )      
}

export default MessageInput