<script setup lang="ts">
import { computed } from 'vue';
import { TaskStatus, type Task } from '../types/task.ts';
import TaskList from './TaskList.vue';

interface TaskColumnProps {
    title: string
    status: TaskStatus
    tasks: Task[]
}

const props = defineProps<TaskColumnProps>()

const columnStatus = computed<string>(() => {
    switch (props.status) {
        case TaskStatus.TODO:
            return 'todo'
        case TaskStatus.IN_PROGRESS:
            return 'in-progress'
        case TaskStatus.DONE:
            return 'done'
        default:
            return 'todo'
    }
})
</script>

<template>
    <div class="task-column" :class="`task-column--${columnStatus}`">
        <div class=" task-column__header">
            <div class="task-column__title-wrapper">
                <h3 class="task-column__title">{{ title }}</h3>
            </div>
        </div>

        <TaskList :taskList="tasks" />
    </div>
</template>

<style lang="scss">
.task-column {
    background: #f7fafc;
    border-radius: 12px;
    padding: 16px;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    border-top: 4px solid #e2e8f0;

    &--todo {
        border-top-color: #3b82f6;
    }

    &--in-progress {
        border-top-color: #f59e0b;
    }

    &--done {
        border-top-color: #10b981;
    }

    &__header {
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 2px solid #e2e8f0;
    }

    &__title-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__title {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #1a202c;
    }
}
</style>