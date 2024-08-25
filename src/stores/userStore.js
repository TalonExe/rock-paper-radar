import { create } from 'zustand'
import Cookies from 'js-cookie'
import mainAxios from '../api/mainAxios'

const userStore = create((set, get) => ({
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
    getPersonalProfile: async () => {
        try {
            const response = await mainAxios.get('/user/personalProfile', {
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
                    totalPosts: data.totalPosts,
                    joinedDate: `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`,
                }
            });
        } catch (error) {
            console.log(error);
        }
    },
    getUserPosts: async (username) => {
        try {
            const response = await mainAxios.get('/travelPost/userPosts', {
                params: {
                    username
                }
            });
            const data = response.data.data;
            set({ profilePosts: data.posts });
            set({
                userProfile: {
                    username: data.username,
                    profilePictureUrl: data.profilePictureUrl
                }
            })
        } catch (error) {
            console.log(error);
        }
    },
    getPostDetails: async (postId) => {
        try {
            const response = await mainAxios.get(`/travelPost/post`, {
                params: {
                    postId
                }
            });
            const isLiked = await mainAxios.get(`/travelPost/verifyLike/${postId}`, {
                headers: {
                    authorization: Cookies.get('token'),
                },
            });
            const data = response.data.data;
            data.isLiked = isLiked.data.liked;
            set({ postDetails: data });
        } catch (error) {
            console.log(error);
        }
    },
    getReportedPostDetails: async (postId) => {
        try {
            const response = await mainAxios.get(`/travelPost/post`, {
                params: {
                    postId
                }
            });
            const data = response.data.data;
            set({ postDetails: data });
        } catch (error) {
            console.log(error);
        }
    },
    getPublicProfile: async (username) => {
        try {
            const response = await mainAxios.get('/user/profile', {
                params: {
                    username
                },
                headers: {
                    authorization: Cookies.get('token'),
                },
            });
            const data = response.data.data;
            const date = new Date(data.joinedDate);
            set({
                profileDetails: {
                    username: data.username,
                    profilePictureUrl: data.profilePictureUrl,
                    totalPosts: data.totalPosts,
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
            const response = await mainAxios.put('/user/profile', input, {
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
    deletePost: async (postId) => {
        try {
            await mainAxios.delete(`/travelPost/${postId}`, {
                headers: {
                    authorization: Cookies.get('token'),
                },
            });
        } catch (error) {
            console.log(error);
        }
    },
    likePost: async (postId) => {
        try {
            await mainAxios.put(`/travelPost/like/${postId}`, {}, {
                headers: {
                    authorization: Cookies.get('token'),
                },
            });
        } catch (error) {
            console.log(error);
        }
    },
    commentPost: async (postId, comment) => {
        try {
            await mainAxios.post(`/comment/${postId}`, {
                commentContent: comment
            }, {
                headers: {
                    authorization: Cookies.get('token'),
                },
            });
        } catch (error) {
            console.log(error);
        }
    },
    getPostComments: async (postId) => {
        try {
            const response = await mainAxios.get(`/comment/${postId}`, {
                headers: {
                    authorization: Cookies.get('token'),
                }
            });
            set({ postComments: response.data.data });
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
    getCommunityPosts: async () => {
        try {
            const response = await mainAxios.get('/travelPost/');
            set({ communityPosts: response.data.data });
        } catch (error) {
            console.log(error);
        }
    },
    updatePost: async (postId, input) => {
        try {
            await mainAxios.put(`/travelPost/${postId}`, {
                pictureUrl: input.pictureUrl,
                postTitle: input.postTitle,
                postLocation: input.postLocation,
                categories: input.tags,
                postDescription: input.postContent
            },
                {
                    headers: {
                        authorization: Cookies.get('token'),
                    },
                });
        } catch (error) {
            console.log(error);
        }
    },
    deleteComment: async (commentId) => {
        try {
            await mainAxios.delete(`/comment/${commentId}`, {
                headers: {
                    authorization: Cookies.get('token'),
                },
            });
        } catch (error) {
            console.log(error);
        }
    },
    editComment: async (commentId, input) => {
        try {
            await mainAxios.put(`/comment/${commentId}`, {
                commentContent: input.commentContent
            }, {
                headers: {
                    authorization: Cookies.get('token'),
                },
            });
        } catch (error) {
            console.log(error);
        }
    },
    createMarker: async (input) => {
        try {
            await mainAxios.post('/markerData', {
                type: input.type,
                latitude: input.lat,
                longitude: input.lng,
                mapId: input.id
            }, {
                headers: {
                    authorization: Cookies.get('token'),
                },
            });
        } catch (error) {
            console.log(error);
        }
    },
    getMarkers: async () => {
        try {
            const response = await mainAxios.get('/markerData');
            set({ markers: response.data.markers });
        } catch (error) {
            console.log(error);
        }
    },
    deleteMarker: async (id) => {
        try {
            await mainAxios.delete(`/markerData/${id}`, {
                headers: {
                    authorization: Cookies.get('token'),
                },
            });
        } catch (error) {
            console.log(error);
        }
    },
    postTravelPlan: async (input) => {
        try {
            const response = await mainAxios.post('/travelPlan', {
                title: input.title,
                duration: input.duration,
                location: input.location,
                categories: input.tags,
                pictureUrl: input.pictureUrl
            }, {
                headers: {
                    authorization: Cookies.get('token'),
                },
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getUserTravelPlans: async () => {
        try {
            const response = await mainAxios.get('/travelPlan/user', {
                headers: {
                    authorization: Cookies.get('token'),
                },
            });
            set({ travelPlans: response.data.travelPlans });
            return response.data.travelPlans;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    deleteTravelPlan: async (id) => {
        try {
            await mainAxios.delete(`/travelPlan/${id}`, {
                headers: {
                    authorization: Cookies.get('token'),
                },
            });
        } catch (error) {
            console.log(error);
        }
    },
    editTravelPlan: async (id, input) => {
        try {
            await mainAxios.put(`/travelPlan/${id}`, {
                title: input.title,
                duration: input.duration,
                location: input.location,
                categories: input.categories,
                pictureUrl: input.pictureUrl
            }, {
                headers: {
                    authorization: Cookies.get('token'),
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
}))

export default userStore;