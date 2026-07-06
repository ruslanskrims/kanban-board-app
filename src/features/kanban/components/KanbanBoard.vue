<template>
    <div class="app-header">
        <h1>📋 Kanban Board</h1>
    </div>
    <el-row :gutter="20" class="board-row">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <KanbanColumn :status="TaskStatus.TODO" title="To Do" :tasks="getTasksByStatus(TaskStatus.TODO)" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <KanbanColumn :status="TaskStatus.IN_PROGRESS" title="In Progress"
                :tasks="getTasksByStatus(TaskStatus.IN_PROGRESS)" />
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <KanbanColumn :status="TaskStatus.DONE" title="Done" :tasks="getTasksByStatus(TaskStatus.DONE)" />
        </el-col>
    </el-row>
</template>


<script setup lang="ts">
import { onMounted } from 'vue'
import KanbanColumn from '@/features/kanban/components/KanbanColumn.vue'
import { useTaskStore } from '../stores/taskStore'
import { TaskStatus } from '../types/task'

const { initialize, taskList, getTasksByStatus } = useTaskStore()

onMounted(() => {
    initialize()
})
</script>

<style scoped>
.kanban-lite-view {
    padding: 24px;
    max-width: 1400px;
    margin: 0 auto;
}

.app-header {
    margin-bottom: 24px;
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
    margin: 0 -10px;
}

.board-row .el-col {
    padding: 0 10px;
}
</style>