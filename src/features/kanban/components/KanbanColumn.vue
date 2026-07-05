<template>
    <div class="kanban-column" :class="`kanban-column--${status}`">
        <div class=" kanban-column__header">
            <div class="kanban-column__title-wrapper">
                <h3 class="kanban-column__title">{{ title }}</h3>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TaskStatus } from '../types/task';

interface KanbanColumnProps {
    title: string
    status: TaskStatus
}

const props = defineProps<KanbanColumnProps>()
</script>

<style scoped>
.kanban-column {
    background: #f7fafc;
    border-radius: 12px;
    padding: 16px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    border-top: 4px solid #e2e8f0;
}

.kanban-column--todo {
    border-top-color: #3b82f6;
}

.kanban-column--in-progress {
    border-top-color: #f59e0b;
}

.kanban-column--done {
    border-top-color: #10b981;
}

.kanban-column__header {
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid #e2e8f0;
}

.kanban-column__title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.kanban-column__title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #1a202c;
}
</style>