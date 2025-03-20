import {useChatStore} from "../Store/useChatStore.js"
import { useEffect } from "react"
import MessageInput from "./MessageInput.jsx"
import ChatHeader from "./ChatHeader.jsx"
import MessageSkeleton from "./Skeletons/MessageSkeleton.jsx"

const ChatContainer = () => {
  
  const { messages, selectedUser, isMessagesLoading, getMessages } = useChatStore()

  useEffect(() => {
    getMessages(selectedUser._id)
  }, [selectedUser._id, getMessages])

  if(isMessagesLoading) {
    return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInput/>
    </div>
  )
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>
      <p>Messages...</p>
      <MessageInput/>
    </div>
  )
}

export default ChatContainer