    import axios from "axios"

    const BASE_URL = "https://localhost:7083/api/todoapplist"

    export const GetAll = (key) => axios.get(`${BASE_URL}?key=${key}`)
    export const Create = (data) => axios.post(`${BASE_URL}`, data)
    export const GetById = (id) => axios.get(`${BASE_URL}/${id}`)
    export const Update = (id, data) => axios.put(`${BASE_URL}/${id}`, data)
    export const UpdateStatus = (data) => axios.patch(`${BASE_URL}/status`, data)
    export const Delete = (id) => axios.delete(`${BASE_URL}/${id}`)
    export const Remove = (data) => axios.delete(`${BASE_URL}/items`, {data})
    export const UploadImages = (todoId, files) => {
        const formData = new FormData()
        files.forEach(file => formData.append("files", file))
        return axios.post(`${BASE_URL}/${todoId}/images`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
    }

    export const GetImages = (todoId) => 
        axios.get(`${BASE_URL}/${todoId}/images`)

    export const RemoveImages = (todoId, imageIds) => 
        axios.delete(`${BASE_URL}/${todoId}/images`, { data: imageIds })
