import { useEffect, useState } from 'react'
import { Icon, IconButton } from 'react-native-paper'
import { useLocalSearchParams } from 'expo-router'
import { AppText, ListButton, ModalBase } from '@components'
import { COLORS, USER_TYPE } from '@constants'
import { useAgenda, useSession, useSnackbar, useTask } from '@providers'
import { useTasksService } from '@services'
import {
  DAILY_TASK_STATUS,
  DAILY_TASK_STATUS_ICON,
  DAILY_TASK_STATUS_ICON_COLOR,
} from '../../constants'
import { ButtonsContainer, StatusContainer, StyledView } from './styles'

export function DailyTasks() {
  const [dailyTasksRegisters, setDailyTasksRegisters] = useState([])
  const [loadingTask, setLoadingTask] = useState({
    status: false,
    id: null,
  })
  const [modalData, setModalData] = useState({
    isOpen: false,
    content: '',
  })
  const { id } = useLocalSearchParams()
  const { findAgendaDailyTasks, createDailyTask, updateDailyTask } =
    useTasksService()
  const { showErrorMessage } = useSnackbar()
  const { currentAgenda, handleAgendaCreation, refreshAgendas } = useAgenda()
  const {
    userData: { userType },
  } = useSession()
  const { tasks, fetchTasks } = useTask()

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    fetchDailyTasks()
  }, [currentAgenda])

  async function fetchDailyTasks() {
    if (currentAgenda) {
      try {
        const { data } = await findAgendaDailyTasks(currentAgenda.id)
        setDailyTasksRegisters(data)
      } catch {
        showErrorMessage(
          'Não foi possível buscar os registros de tarefas do dia.'
        )
      }
    } else {
      setDailyTasksRegisters([])
    }
  }

  async function getAgendaId() {
    if (currentAgenda) {
      return currentAgenda.id
    } else {
      const agendaId = await handleAgendaCreation()
      return agendaId
    }
  }

  function getNextStatus(currentStatus) {
    switch (currentStatus) {
      case DAILY_TASK_STATUS.DONE:
        return DAILY_TASK_STATUS.NOT_DONE
      case DAILY_TASK_STATUS.NOT_DONE:
        return null
      default:
        return DAILY_TASK_STATUS.DONE
    }
  }

  function handleDismissModal() {
    setModalData({ isOpen: false, content: '' })
  }

  async function handleCreateDailyTask(agendaId, taskId) {
    try {
      await createDailyTask(agendaId, taskId, {
        status: DAILY_TASK_STATUS.DONE,
      })
      if (!currentAgenda) await refreshAgendas()
      fetchDailyTasks()
    } catch {
      showErrorMessage('Falha ao criar registro de tarefa diária.')
    }
  }

  async function handleUpdateDailyTask(dailyTask) {
    try {
      await updateDailyTask(dailyTask.id, {
        status: getNextStatus(dailyTask.status),
      })
      fetchDailyTasks()
    } catch {
      showErrorMessage(
        'Não foi possível atualizar o registro de tarefa diária.'
      )
    }
  }

  async function handleDailyTaskClick(taskId) {
    setLoadingTask({
      status: true,
      id: taskId,
    })

    const dailyTask = dailyTasksRegisters.find(({ task }) => taskId === task.id)

    if (dailyTask) {
      await handleUpdateDailyTask(dailyTask)
    } else {
      const agendaId = await getAgendaId()
      await handleCreateDailyTask(agendaId, taskId)
    }

    setLoadingTask({
      status: false,
      id: null,
    })
  }

  function renderTaskStatus(taskId) {
    const dailyTask = dailyTasksRegisters.find(({ task }) => taskId === task.id)

    return (
      <StatusContainer>
        <Icon
          source={DAILY_TASK_STATUS_ICON[dailyTask?.status]}
          size={20}
          color={DAILY_TASK_STATUS_ICON_COLOR[dailyTask?.status]}
        />
      </StatusContainer>
    )
  }

  function renderEyeButton(description) {
    return (
      !!description && (
        <IconButton
          icon='eye'
          size={20}
          onPress={() => setModalData({ isOpen: true, content: description })}
        />
      )
    )
  }

  function renderTasks() {
    return tasks.map(({ title, description, id }, index) => (
      <ListButton
        key={index}
        disabled={userType === USER_TYPE.NUTRITIONIST}
        backgroundColor={COLORS.SECONDARY_YELLOW}
        onPress={() => handleDailyTaskClick(id)}
        isLoading={loadingTask.status && loadingTask.id === id}
      >
        <StyledView>
          <AppText fullWidth={false}>{title}</AppText>
          <ButtonsContainer>
            {renderEyeButton(description)}
            {renderTaskStatus(id)}
          </ButtonsContainer>
        </StyledView>
      </ListButton>
    ))
  }

  return (
    <>
      <ModalBase isOpen={modalData.isOpen} onDismiss={handleDismissModal}>
        <AppText>{modalData.content}</AppText>
      </ModalBase>
      {renderTasks()}
    </>
  )
}
