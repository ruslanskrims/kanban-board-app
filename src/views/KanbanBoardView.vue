<script setup lang="ts">
import TaskBoard from '@/features/tasks/components/TaskBoard.vue';

</script>

<template>
  <div class="kanban-lite-view">
    <TaskBoard />
  </div>
</template>


<style scoped>
.kanban-lite-view {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}
</style>