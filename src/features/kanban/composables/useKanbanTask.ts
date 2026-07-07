import { apiClient } from '@/api/client'
import type { Task } from '../types/task'
import axios from 'axios'
import { ref } from 'vue'

export function useKanbanTask() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const getAllTasks = async (): Promise<Task[]> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await apiClient.get<Task[]>('')
      return response.data
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = err.message || 'Failed to fetch tasks'
      }
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading: isLoading,
    error: error,
    getAllTasks,
  }
}
