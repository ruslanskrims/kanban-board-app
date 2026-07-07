<script setup lang="ts">
import KanbanBoard from '@/features/kanban/components/KanbanBoard.vue';

</script>

<template>
  <div class="kanban-lite-view">
    <KanbanBoard />
  </div>
</template>


<style scoped>
.kanban-lite-view {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}
</style>