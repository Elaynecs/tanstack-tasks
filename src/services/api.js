import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

export const getTasks = async () => {
  const response = await api.get('/todos')
  return response.data
}

export const deleteTask = async (id) => {
  const response = await api.delete(`/todos/${id}`)
  return response.data
}

