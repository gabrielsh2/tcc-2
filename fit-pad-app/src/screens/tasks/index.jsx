import { router, useLocalSearchParams } from 'expo-router'
import {
  AppButton,
  AppText,
  AppTitle,
  ListButton,
  ListItem,
  PageContainer,
} from '@components'
import { useEffect, useState } from 'react'
import { useTasksService } from '@services'
import { useSnackbar, useTask } from '@providers'
import { COLORS, ROUTES } from '@constants'

export function TasksScreen() {
  const { fetchTasks, tasks } = useTask()
  const { id } = useLocalSearchParams()

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <PageContainer>
      <AppTitle>Lista de Tarefas</AppTitle>
      <AppText>
        Tarefas diárias para seu paciente seguir no dia a dia e compartilhar seu
        progresso!
      </AppText>
      {tasks.map(({ title, id: taskId }, index) => (
        <ListButton
          backgroundColor={COLORS.SECONDARY_YELLOW}
          key={index}
          onPress={() =>
            router.navigate({
              pathname: ROUTES.CREATE_TASK,
              params: {
                id,
                taskId,
              },
            })
          }
        >
          <AppText>{title}</AppText>
        </ListButton>
      ))}
      <AppButton
        onPress={() =>
          router.navigate({
            pathname: ROUTES.CREATE_TASK,
            params: {
              id,
            },
          })
        }
      >
        Criar Tarefa
      </AppButton>
    </PageContainer>
  )
}
