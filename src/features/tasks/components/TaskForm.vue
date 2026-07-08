<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { TaskStatus, type TaskFormData } from '../types/task';
import type { FormInstance, FormRules } from 'element-plus';

interface TaskFormProps {
    formData: TaskFormData
    isSubmitting?: boolean
    isFormValid?: boolean
}

const props = defineProps<TaskFormProps>()

const emit = defineEmits<{
    (e: 'submit', data: TaskFormData): void
    (e: 'cancel'): void
    (e: 'update:valid', valid: boolean): void
}>()

const formRef = ref<FormInstance>()
const localIsValid = ref(false)
const isFormValid = computed(() => props.isFormValid ?? localIsValid.value)
const formRules: FormRules = {
    title: [
        { required: true, message: 'Please enter a task title', trigger: 'blur' },
        { min: 1, max: 100, message: 'Title must be between 1 and 100 characters', trigger: 'blur' }
    ],
    description: [
        { max: 500, message: 'Description must not exceed 500 characters', trigger: 'blur' }
    ],
    status: [
        { required: true, message: 'Please select a status', trigger: 'change' }
    ]
}

const validateForm = async () => {
    if (!formRef.value) {
        localIsValid.value = false
        emit('update:valid', false)
        return
    }

    try {
        await formRef.value.validate()
        localIsValid.value = true
        emit('update:valid', true)
    } catch {
        localIsValid.value = false
        emit('update:valid', false)
    }
}

watch(
    () => [props.formData.title, props.formData.status],
    () => validateForm(),
    { deep: true }
)

const handleSubmit = async () => {
    if (!formRef.value) return

    try {
        await formRef.value.validate()
        emit('submit', {
            title: props.formData.title.trim(),
            description: props.formData.description?.trim() || '',
            status: props.formData.status
        })
    } catch (error) {
        console.error('Form validation error:', error)
    }
}

const handleCancel = () => {
    emit('cancel')
}

defineExpose({
    validateForm,
    resetForm: () => {
        formRef.value?.resetFields()
        formRef.value?.clearValidate()
    }
})
</script>

<template>
    <ElForm ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left"
        class="task-form" @submit.prevent="handleSubmit">
        <h3 class="task-form__title">Create a task</h3>
        <ElFormItem label="Title" prop="title" required>
            <ElInput v-model="formData.title" placeholder="Enter task title" maxlength="100" show-word-limit
                @input="validateForm" />
        </ElFormItem>
        <ElFormItem label="Description" prop="description">
            <ElInput v-model="formData.description" type="textarea" placeholder="Enter the description" :rows="3"
                maxlength="500" show-word-limit @input="validateForm" />
        </ElFormItem>
        <ElFormItem label="Status" prop="status">
            <ElSelect v-model="formData.status" placeholder="Select status" style="width: 100%" @change="validateForm">
                <ElOption :value="TaskStatus.TODO" label="To Do" />
                <ElOption :value="TaskStatus.IN_PROGRESS" label="In Progress" />
                <ElOption :value="TaskStatus.DONE" label="Done" />
            </ElSelect>
        </ElFormItem>

        <div class="task-form__actions">
            <ElButton @click="handleCancel">Cancel</ElButton>
            <ElButton type="primary" :loading="isSubmitting" :disabled="!isFormValid" native-type="submit">
                Create
            </ElButton>
        </div>
    </ElForm>
</template>

<style lang="scss" scoped>
.task-form {
    padding: 10px;
    display: flex;
    flex-direction: column;

    &__title {
        margin-bottom: 10px;
    }

    &__btn {
        align-self: flex-end;
    }

    &__actions {
        display: flex;
        justify-content: flex-end;
    }
}
</style>