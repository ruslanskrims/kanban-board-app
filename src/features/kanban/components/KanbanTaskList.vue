<script lang="ts" setup>
import { ElScrollbar } from 'element-plus'
import type { Task } from '../types/task.js';
import KanbanTaskItem from './KanbanTaskItem.vue'

defineProps<{ taskList: Task[] }>()
</script>

<template>
    <ElScrollbar class="kanban-task-list">
        <KanbanTaskItem v-for="task in taskList" :key="task.id" :task="task" />
    </ElScrollbar>
</template>

<style scoped lang="scss">
.kanban-task-list {
    flex: 1;

}

.el-scrollbar__view {
    display: flex;
    flex-direction: column;
    gap: 30px;
    background-color: red !important;
}

a {
    text-decoration: none;
    color: inherit;
}
</style>
