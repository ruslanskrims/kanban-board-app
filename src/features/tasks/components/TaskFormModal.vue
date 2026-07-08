<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import TaskForm from './TaskForm.vue'
import { TaskStatus, type TaskFormData } from '../types/task.ts'
import { useTaskStore } from '../stores/taskStore.ts'

interface TaskFormModalProps {
    visibleModal: boolean
    initialStatus?: TaskStatus
    isLoading?: boolean
}

const props = withDefaults(defineProps<TaskFormModalProps>(), {
    initialStatus: TaskStatus.TODO,
    isLoading: false
})

const emit = defineEmits<{
    (e: 'update:visibleModal', value: boolean): void
    (e: 'submit', data: TaskFormData): void
}>()

const { addTask } = useTaskStore()

const formRef = ref<FormInstance>()
const isSubmitting = ref(false)

const formData = reactive<TaskFormData>({
    title: '',
    description: '',
    status: props.initialStatus || TaskStatus.TODO
})

const isFormValid = computed(() => {
    return formData.title.trim().length > 0
})

const isModalVisible = computed({
    get: () => props.visibleModal,
    set: (value) => emit('update:visibleModal', value)
})

watch(() => props.visibleModal, (newVal) => {
    if (newVal) {
        formData.title = ''
        formData.description = ''
        formData.status = props.initialStatus || TaskStatus.TODO
        formRef.value?.clearValidate()
    }
})

const handleClose = () => {
    formRef.value?.resetFields()
    emit('update:visibleModal', false)
}

const handleSubmit = async (submittedData: TaskFormData): Promise<void> => {
    if (!formRef.value) return

    try {
        isSubmitting.value = true
        await formRef.value.validate()

        await addTask(formData)

        ElMessage.success('Task created successfully!')
        emit('submit', submittedData)
        handleClose()
    } catch (err) {
        ElMessage.error('Failed to create a task. Try again')
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <ElDialog v-model="isModalVisible" width="550px" :close-on-click-modal="false" destroy-on-close
        @close="handleClose">
        <TaskForm :form-data="formData" :is-submitting="isSubmitting" :is-form-valid="isFormValid"
            @submit="handleSubmit" @cancel="handleClose" />
    </ElDialog>
</template>
