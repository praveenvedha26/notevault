import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

export const signupAPI = (data) => API.post('/auth/signup', data)
export const loginAPI = (data) => API.post('/auth/login', data)

export const getNotesAPI = () => API.get('/notes')
export const getStarredNotesAPI = () => API.get('/notes/starred')
export const getTrashedNotesAPI = () => API.get('/notes/trash')
export const createNoteAPI = (data) => API.post('/notes', data)
export const updateNoteAPI = (id, data) => API.put(`/notes/${id}`, data)
export const deleteNoteAPI = (id) => API.delete(`/notes/${id}`)
export const starNoteAPI = (id) => API.put(`/notes/${id}/star`)
export const trashNoteAPI = (id) => API.put(`/notes/${id}/trash`)
export const restoreNoteAPI = (id) => API.put(`/notes/${id}/restore`)
export const summarizeNoteAPI = (id) => API.post(`/notes/${id}/summarize`)