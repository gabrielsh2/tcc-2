import { useEffect, useRef, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import {
  AppButton,
  AppInput,
  AppTextArea,
  AppTitle,
  PageContainer,
} from '@components'
import { useTasksService } from '@services'
import { useAgenda, useSnackbar, useTask } from '@providers'
import { FORM_FIELDS, INITIAL_FORM } from './constants'

export function CreateTaskScreen() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [isLoading, setIsLoading] = useState(false)
  const descriptionRef = useRef()
  const { id: patientId, taskId } = useLocalSearchParams()
  const { createTask, updateTask } = useTasksService()
  const { tasks, fetchTasks } = useTask()
  const { showErrorMessage, showSuccessMessage } = useSnackbar()

  useEffect(() => {
    if (taskId) {
      const currentTask = tasks.find(({ id }) => id == taskId)
      setFormData(currentTask)
    }
  }, [taskId])

  function handleInputChange(name, value) {
    setFormData({ ...formData, [name]: value })
  }

  async function handleUpdateTask() {
    try {
      await updateTask(taskId, formData)
      await fetchTasks()
      router.back()
      setFormData(INITIAL_FORM)
      showSuccessMessage('Tarefa editada com sucesso.')
    } catch (error) {
      showErrorMessage('Erro ao atualizar tarefa.')
    }
  }

  async function handleCreateTask() {
    try {
      await createTask(patientId, formData)
      await fetchTasks()
      router.back()
      showSuccessMessage('Tarefa criada com sucesso.')
      setFormData(INITIAL_FORM)
    } catch {
      showErrorMessage('Erro ao criar tarefa.')
    }
  }

  async function handleClickSubmit() {
    setIsLoading(true)

    if (taskId) {
      await handleUpdateTask()
    } else {
      await handleCreateTask()
    }

    setIsLoading(false)
  }

  return (
    <PageContainer>
      <AppTitle>Tarefa</AppTitle>
      <AppInput
        label='Título'
        onChange={(text) => handleInputChange(FORM_FIELDS.TITLE, text)}
        value={formData[FORM_FIELDS.TITLE]}
        returnKeyType='next'
        blurOnSubmit={false}
        onSubmitEditing={() => descriptionRef.current.focus()}
      />
      <AppTextArea
        onChange={(text) => handleInputChange(FORM_FIELDS.DESCRIPTION, text)}
        inputRef={descriptionRef}
        value={formData[FORM_FIELDS.DESCRIPTION]}
      />
      <AppButton isLoading={isLoading} onPress={handleClickSubmit}>
        Salvar
      </AppButton>
    </PageContainer>
  )
}
