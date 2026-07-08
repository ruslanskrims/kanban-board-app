<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { TaskStatus, type TaskFormData } from '../types/task'
import { ElButton, ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import TaskColumn from './TaskColumn.vue'
import TaskFormModal from './TaskFormModal.vue'

const { fetchTasks, getTasksByStatus, isLoading, error, addTask } = useTaskStore()

const isFormVisible = ref(false)
const initialFormStatus = ref<TaskStatus>(TaskStatus.TODO)

const openCreateModal = () => {
    initialFormStatus.value = TaskStatus.TODO
    isFormVisible.value = true
}

onMounted(async () => {
    try {
        await fetchTasks()
    } catch (error) {
        console.error('Failed to load tasks:', error)
    }
})

const handleCreateTask = async (formData: TaskFormData) => {
    try {
        await addTask(formData)
        ElMessage.success('Task created successfully!')
    } catch (error) {
        ElMessage.error('Failed to create task')
    }
}
</script>

<template>
    <TaskFormModal v-model:visibleModal="isFormVisible" :initial-status="TaskStatus.TODO" :is-loading="isLoading"
        @submit="handleCreateTask" />
    <div class="app-header">
        <h1>📋 Kanban Board</h1>
        <ElButton type="primary" :icon="Plus" size="large" @click="openCreateModal">Create task</ElButton>
    </div>
    <el-row :gutter="20" class="board-row">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <TaskColumn :status="TaskStatus.TODO" title="To Do" :tasks="getTasksByStatus(TaskStatus.TODO)" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <TaskColumn :status="TaskStatus.IN_PROGRESS" title="In Progress"
                :tasks="getTasksByStatus(TaskStatus.IN_PROGRESS)" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <TaskColumn :status="TaskStatus.DONE" title="Done" :tasks="getTasksByStatus(TaskStatus.DONE)" />
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.app-header {
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
}

.app-header h1 {
    margin: 0 0 8px 0;
    font-size: 28px;
    color: #1a202c;
}

.subtitle {
    margin: 0;
    color: #718096;
    font-size: 14px;
}

.filters-section {
    margin-bottom: 24px;
    display: flex;
    gap: 16px;
    align-items: center;
}

.board-row {
    margin: 0 auto;
}

.board-row .el-col {
    padding: 0 10px;
}
</style>