import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTasks, deleteTask } from '../services/api'

export default function TaskList() {
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  if (isLoading) return <p>Carregando tarefas...</p>
  if (isError) return <p>Erro: {error.message}</p>

  return (
    <ul>
      {data.map((task) => (
        <li key={task.id}>
          {task.title}

          <button
            onClick={() => deleteMutation.mutate(task.id)}
            style={{ marginLeft: '10px' }}
          >
            Excluir
          </button>
        </li>
      ))}
    </ul>
  )
}
