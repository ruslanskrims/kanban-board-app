import { apiClient } from '@/api/client'
import type { Task, TaskFormData } from '../types/task'

export function useKanbanTask() {
  const getAllTasks = async (): Promise<Task[]> => {
    try {
      const response = await apiClient.get<Task[]>('')
      return response.data
    } catch (err: unknown) {
      throw err
    }
  }

  const createTask = async (formData: TaskFormData): Promise<Task> => {
    try {
      const response = await apiClient.post('', {
        title: formData.title,
        description: formData.description,
        status: formData.status,
      })

      const newTask = {
        ...response.data,
        createdAt: new Date(response.data.createdAt),
        updatedAt: new Date(response.data.updatedAt),
      }
      return newTask
    } catch (error) {
      throw error
    }
  }

  return {
    getAllTasks,
    createTask,
  }
}
