<template>
    <div class="kanban-column" :class="`kanban-column--${columnStatus}`">
        <div class=" kanban-column__header">
            <div class="kanban-column__title-wrapper">
                <h3 class="kanban-column__title">{{ title }}</h3>
            </div>
        </div>

        <KanbanTaskList :taskList="tasks" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { TaskStatus, type Task } from '../types/task';
import KanbanTaskList from './KanbanTaskList.vue';

interface KanbanColumnProps {
    title: string
    status: TaskStatus
    tasks: Task[]
}

const props = defineProps<KanbanColumnProps>()

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

<style lang="scss">
.kanban-column {
    background: #f7fafc;
    border-radius: 12px;
    padding: 16px;
    min-height: 85vh;
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