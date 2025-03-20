import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"

export const useAuthStore = create((set) => ({
    //states we would be using
    authUser: null,
    isSigningUp: false, //for signup page
    isLoggingIn: false, //for login page
    isUpdatingProfile: false,   // for updating profile page
    isCheckingAuth: true,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            console.log("Responce from server in checkAuth: ", res)
            set({authUser: res.data})
        } catch (error) {
            console.log("Error in checking auth: ", error)
            set({authUser: null})
        }finally{
            set({isCheckingAuth: false})
        }
    },

    signupLogic: async(data) => {
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({authUser: res.data })
            toast.success("Account created succesfully")
        } catch (error) {
            console.log("error in useAuthStore.js")
            toast.error(error)
        }finally{
            set({ isSigningUp: false })
        }
    },

    logout: async() => {
        try {
            const res = await axiosInstance.post("/auth/logout") //will take cookie
            set({authUser: res.data})
            toast.success("Logged out succefully")
        } catch (error) {
            console.log("Error in the logout funtion: ")
            toast.error(error.response.data.message)
        }
    },

    loginLogic : async (data) => {
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data})
            toast.success("Logged in Successfully")
        } catch (error) {
            console.log("Error in the login Logic function: ")
            toast.error(error.response.data.message)
        }finally{
           set({isLoggingIn: false})     
        }
    },

    updateProfileLogic: async (data) => {
        set({ isUpdatingProfile : true})
        try {
            const res = await axiosInstance.put("/auth/update-profile", data)
            set({ authUser: res.data })
            toast.success("Profile updated succesfully")
        } catch (error) {
            console.log("error in update profile function", error)
            toast.error(error.response.data.msg)
        }finally{
            set({ isUpdatingProfile: false})
        }
    }

}))