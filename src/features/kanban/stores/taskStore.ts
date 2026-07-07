import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { TaskStatus, type Task } from '../types/task'
import { useKanbanTask } from '../composables/useKanbanTask'

export const useTaskStore = defineStore('task', () => {
  const taskList = ref<Task[]>([])
  const { getAllTasks } = useKanbanTask()

  const fetchTasks = async (): Promise<void> => {
    const tasks = await getAllTasks()
    taskList.value = tasks
  }

  const hasTasks = computed(() => taskList.value.length > 0)

  const getTasksByStatus = computed(() => (status: TaskStatus) => {
    return taskList.value.filter((task) => task.status === status)
  })

  return {
    taskList,
    fetchTasks,
    hasTasks,
    getTasksByStatus,
  }
})
