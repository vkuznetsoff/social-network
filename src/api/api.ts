import { ProfileType } from './../types/types';
import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  headers: {
    "api-key": "afd21f3a-a0dd-43e3-a2a5-a9c8b5557520"
  },
  baseURL: "https://social-network.samuraijs.com/api/1.0/"
})



export const userAPI: any = {
  getUsers: (currentPage = 1, pageSize = 10) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data)
  },

  unfollowUser: (userID: number) => {
    return instance.delete(`follow/${userID}`).then(response => response.data)
  },

  followUser: (userID: number) => {
    return instance.post(`follow/${userID}`).then(response => response.data)
  },

  getProfile: (userID: number) => {
    console.log('This method will be run from ProfileAPI')
    return profileAPI.getProfile(userID)

  }

}

export const profileAPI: any = {
  getProfile: (userID: number) => {
    return instance.get(`profile/${userID}`)
  },

  getUserStatus: (userID: number) => {
    
    return instance.get(`/profile/status/${userID}`)
  },

  updateStatus: (status: string) => {
    return instance.put(`/profile/status`, { status: status })
  },

  loadPhoto: (file: any) => {
    let formData = new FormData();
    formData.append("image", file)
    return instance.put(`/profile/photo`, formData,
    { headers: {"Content-Type": "multipart/form-data"} })
  },

  saveProfile: (profile: ProfileType) => {
    return instance.put(`/profile`, profile)
  },

}


export const authAPI: any = {
  me() {
    return instance.get('auth/me/')

  },

  login(email: string, password: string, rememberMe: boolean = false, captcha: string = null) {
    debugger
    return instance.post('auth/login', { email, password, rememberMe, captcha })
  },

  logout() {
    return instance.delete('auth/login')
  }
}

export const securityAPI: any = {
  getCaptchaUrl() {
    return instance.get('security/get-captcha-url')
  }
}


