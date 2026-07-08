export enum TaskStatus {
  TODO = 1,
  IN_PROGRESS = 2,
  DONE = 3,
}

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  createdAt: Date
  updatedAt: Date
}

export interface TaskFormData {
  title: string
  description?: string
  status: number
}
