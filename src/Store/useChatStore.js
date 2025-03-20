import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { sendMessages } from "../../../../backend/src/controller/message.controller.js";


export const useChatStore = create((set, get)=> ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({isUsersLoading: true})
        try {
            const res = await axiosInstance.get("/message/users")
            // console.log("responce data in getUsers: ", res.data)
            set({users: res.data})  
        } catch (error) {
            console.log("error in useChatStore getUsers:", error)
            toast.error(error.response.data.messages)
        }finally{
            set({isUsersLoading: false})
        }
    },

    getMessages: async (userId) => {
        set({isMessagesLoading: true})
        try {
            const res = await axiosInstance.get(`/message/${userId}`)
            set({messages: res.data})
        } catch (error) {
            console.log("error in useChatStroe getMessage:", error)
            toast.error(error.response.data.messages)    
        }finally{
            set({isMessagesLoading: false})
        }
    },

    sendMessages: async(messageData) => {
        const {selectedUser, messages} = get()
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser}`, messageData)
            set({messages: [...messages, res.data] })
        } catch (error) {
            console.log("error in UseChatStore Sending Message:", error)
            toast.error(error.response.data.messages)
        }

    },

    setSelectedUser: (selectedUser) => {
        set({selectedUser})
    }
})) 