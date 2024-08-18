import { create } from 'zustand'
import Cookies from 'js-cookie'
import mainAxios from '../api/mainAxios'

const staffStore = create((set, get) => ({
    isLogin: false,
    profilePictureUrl: Cookies.get('profilePictureUrl'),
    username: Cookies.get('username'),
    personalProfile: null,
    userPosts: null,
    profilePosts: null,
    postDetails: null,
    profileDetails: null,
    postComments: null,
    markers: null,
    travelPlans: null,
    employees: null,
    setLogin: (value) => set({ isLogin: value }),
    setProfilePictureUrl: (value) => set({ profilePictureUrl: value }),
    setUsername: (value) => set({ username: value }),
    setPersonalProfile: (value) => set({ personalProfile: value }),
    setTotalPosts: (value) => set({ totalPosts: value }),
    setPostDetails: (value) => set({ postDetails: value }),
    setMarkers: (value) => set({ markers: value }),
    logout: () => set(() => ({
        isLogin: false,
        profilePictureUrl: null,
        username: null,
        personalProfile: null,
        userPosts: null,
        profilePosts: null,
        postDetails: null,
        profileDetails: null,
        postComments: null,
        markers: null,
    })),
    checkLogin: () => {
        if (Cookies.get("token") !== undefined) {
            set({ isLogin: true });
        } else {
            set({ isLogin: false });
        }
    },
    getEmployees: async() => {
        try{
            const response = await mainAxios.get('/admin/employees', {
                headers: {
                    authorization: Cookies.get('token'),
                },
            });
            set({ employees: response.data.data });
        }catch(error){
            console.error(error);
        }
    },
    getPersonalProfile: async () => {
        try {
            const response = await mainAxios.get('/staff/personalProfile', {
                headers: {
                    authorization: Cookies.get('token'),
                },
            });
            const data = response.data.data;
            const date = new Date(data.joinedDate);
            set({ profilePictureUrl: data.profilePictureUrl });
            set({
                personalProfile: {
                    joinedDate: `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`,
                    totalPosts: data.totalPosts,
                }
            });
            set({
                profileDetails: {
                    username: data.username,
                    profilePictureUrl: data.profilePictureUrl,
                    totalBlogs: data.totalBlogs,
                    joinedDate: `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`,
                }
            });
        } catch (error) {
            console.log(error);
        }
    },
    getPublicProfile: async (username) => {
        try {
            const response = await mainAxios.get('/staff/profile', {
                params: {
                    username
                },
                headers: {
                    authorization: Cookies.get('token'),
                },
            });
            const data = response.data.data;
            const date = new Date(data.createdAt);
            set({
                profileDetails: {
                    username: data.username,
                    profilePictureUrl: data.profilePictureUrl,
                    totalBlogs: data.totalBlogs,
                    joinedDate: `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`,
                }
            });
            return data;
        } catch (error) {
            console.error(`Error fetching profile for username: ${username}`, error);
        }
    },
    updateProfile: async (input) => {
        try {
            const response = await mainAxios.put('/staff/profile', input, {
                headers: {
                    authorization: Cookies.get('token'),
                },
            });
            const data = response.data.data;
            const previousDetails = get().profileDetails;
            for (const key in previousDetails) {
                if (key in data) {
                    previousDetails[key] = data[key];
                }
            }
            Cookies.set('profilePictureUrl', data.profilePictureUrl);
            set({ profilePictureUrl: data.profilePictureUrl });
            set({ profileDetails: previousDetails });
        } catch (error) {
            console.log(error);
        }
    },
    signIn: (data) => {
        set({
            isLogin: true,
            username: data.username,
            profilePictureUrl: data.profilePictureUrl
        });
    },
    getBlogs: async () => {
        try {
            const response = await mainAxios.get('/blog/');
            set({ blogs: response.data.data });
        } catch (error) {
            console.log(error);
        }
    },
    getMyBlogs: async () => {
        try {
            const response = await mainAxios.get('/blog/myBlogs', {
                headers: {
                    authorization: Cookies.get('token'),
                }
            });
            set({ blogs: response.data.data });
        } catch (error) {
            console.log(error);
        }
    }
}))

export default staffStore;