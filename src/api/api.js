import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  headers: {
    "api-key": "afd21f3a-a0dd-43e3-a2a5-a9c8b5557520"
  },
  baseURL: "https://social-network.samuraijs.com/api/1.0/"
})



export const userAPI = {
  getUsers: (currentPage = 1, pageSize = 10) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data)
  },

  unfollowUser: (userID) => {
    return instance.delete(`follow/${userID}`).then(response => response.data)
  },

  followUser: (userID) => {
    return instance.post(`follow/${userID}`).then(response => response.data)
  },

  getProfile: (userID) => {
    console.log('This method will be run from ProfileAPI')
    return profileAPI.getProfile(userID)

  }

}

export const profileAPI = {
  getProfile: (userID) => {
    return instance.get(`profile/${userID}`)
  },

  getUserStatus: (userID) => {
    
    return instance.get(`/profile/status/${userID}`)
  },

  updateStatus: (status) => {
    return instance.put(`/profile/status`, { status: status })
  },

  loadPhoto: (file) => {
    let formData = new FormData();
    formData.append("image", file)
    return instance.put(`/profile/photo`, formData,
    { headers: {"Content-Type": "multipart/form-data"} })
  }


}


export const authAPI = {
  me() {
    return instance.get('auth/me/')

  },

  login(email, password, rememberMe = false, captcha = false) {
    //debugger
    return instance.post('auth/login', { email, password, rememberMe, captcha })
  },

  logout() {
    return instance.delete('auth/login')
  }
}


