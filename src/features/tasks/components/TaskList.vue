<script lang="ts" setup>
import { ElScrollbar } from 'element-plus'
import type { Task } from '../types/task.js';
import TaskItem from './TaskItem.vue'

defineProps<{ taskList: Task[] }>()
</script>

<template>
    <ElScrollbar class="task-list">
        <TaskItem v-for="task in taskList" :key="task.id" :task="task" />
    </ElScrollbar>
</template>

<style scoped lang="scss">
.task-list {
    flex: 1;
    overflow-y: auto;

    .el-scrollbar__view {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
}
</style>
