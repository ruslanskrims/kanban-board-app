import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { TaskStatus, type Task, type TaskFormData } from '../types/task'
import { useKanbanTask } from '../composables/useKanbanTask'

export const useTaskStore = defineStore('task', () => {
  const taskList = ref<Task[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const { getAllTasks, createTask } = useKanbanTask()

  const fetchTasks = async (): Promise<void> => {
    isLoading.value = true
    error.value = null
    try {
      const tasks = await getAllTasks()
      taskList.value = tasks
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch tasks'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const hasTasks = computed(() => taskList.value.length > 0)

  const getTasksByStatus = computed(() => (status: TaskStatus) => {
    return taskList.value.filter((task) => task.status === status)
  })

  const addTask = async (formData: TaskFormData): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      const newTask = await createTask(formData)
      taskList.value = [...taskList.value, newTask]
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message || 'Failed to fetch tasks'
      } else {
        error.value = 'An unknown error occurred'
      }
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    taskList,
    fetchTasks,
    hasTasks,
    getTasksByStatus,
    addTask,
    isLoading,
    error,
  }
})
