<script setup lang="ts">
import * as dayjs from 'dayjs'
import 'dayjs/locale/en'
import KanbanBoardView from './views/KanbanBoardView.vue';

dayjs.locale('en')
</script>

<template>
    <KanbanBoardView />
</template>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #f0f2f5;
    min-height: 100vh;
}

#app {
    min-height: 100vh;
}
</style>