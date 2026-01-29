import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'

export function TaskForm() {
  const [title, setTitle] = useState('')
  const queryClient = useQueryClient()

  const createTaskMutation = useMutation({
    mutationFn: async (newTask) => {
      const response = await api.post('/todos', newTask)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
      setTitle('')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    createTaskMutation.mutate({
      title,
      completed: false,
      userId: 1
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nova tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <button type="submit">
        Adicionar
      </button>

      {createTaskMutation.isLoading && <p>Salvando...</p>}
      {createTaskMutation.isError && <p>Erro ao salvar tarefa</p>}
      {createTaskMutation.isSuccess && <p>Tarefa criada!</p>}
    </form>
  )
}
