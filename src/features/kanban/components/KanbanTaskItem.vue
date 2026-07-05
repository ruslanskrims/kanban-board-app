<script setup lang="ts">
import { Clock } from '@element-plus/icons-vue'
import type { Task } from '../types/task';

interface TaskProps {
    task: Task
}

const props = defineProps<TaskProps>()
</script>

<template>
    <el-card class="kanban-task-card" :class="`task-card--${task.status}`" shadow="hover">
        <template #header>
            <div class="kanban-task-card__header">
                <h3 class="kanban-task-card__title">{{ task.title }}</h3>
            </div>
        </template>

        <div v-if="task.description" class="kanban-task-card__description">
            {{ task.description }}
        </div>

        <div class="kanban-task-card__footer">
            <el-tag size="small">
                {{ task.status }}
            </el-tag>
            <span class="kanban-task-card__timestamp">
                <el-icon>
                    <Clock />
                </el-icon>
                {{ task.updatedAt }}
            </span>
        </div>
    </el-card>
</template>



<style scoped>
.task-card {
    margin-bottom: 16px;
    transition: all 0.3s ease;
    cursor: grab;
    border-left: 4px solid #e2e8f0;
}

.task-card:hover {
    transform: translateY(-2px);
}

.task-card--todo {
    border-left-color: #3b82f6;
}

.task-card--in-progress {
    border-left-color: #f59e0b;
}

.task-card--done {
    border-left-color: #10b981;
}

.task-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
}

.task-card__title {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    flex: 1;
    word-break: break-word;
}

.task-card__actions {
    display: flex;
    gap: 4px;
    flex-shrink: 0;
}

.task-card__description {
    margin: 8px 0 12px;
    font-size: 13px;
    color: #666;
    word-break: break-word;
}

.task-card__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #f0f0f0;
}

.task-card__timestamp {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #999;
}
</style>
