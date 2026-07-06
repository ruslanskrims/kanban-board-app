import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { type Task, TaskStatus } from '../types/task'

const STORAGE_KEY = 'kanban-tasks'

export const useTaskStore = defineStore('task', () => {
  const taskList = ref<Task[]>([])

  const loadTasks = (): void => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        taskList.value = parsed.map((task: Task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        }))
      } catch (error) {
        taskList.value = []
      }
    }
  }

  const initialize = (): void => {
    loadTasks()
    if (taskList.value.length === 0) {
      const initTaskList: Task[] = [
        {
          id: uuidv4(),
          title: '[TOL-1] Initate the project worklow',
          description: 'Set up the project structure and install dependencies',
          status: TaskStatus.DONE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          title: '[TOL-2] Setup the database schema and tables',
          description: 'Check Element Plus and Vue 3 guides',
          status: TaskStatus.IN_PROGRESS,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          title: '[TOL-3] Configure TypeScript and ESLint',
          description: 'Configure TypeScript and ESLINT for the project',
          status: TaskStatus.TODO,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          title: '[TOL-4] Configure Husky',
          description: 'Configure Husky',
          status: TaskStatus.TODO,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
      taskList.value = initTaskList
      saveTasks(taskList.value)
    }
  }

  const saveTasks = (tasks: Task[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }

  const addTask = (task: Task): void => {
    taskList.value.push(task)
    saveTasks(taskList.value)
  }

  const hasTasks = computed(() => taskList.value.length > 0)

  const getTasksByStatus = computed(() => (status: TaskStatus) => {
    return taskList.value.filter((task) => task.status === status)
  })

  return {
    initialize,
    taskList,
    hasTasks,
    addTask,
    getTasksByStatus,
  }
})
