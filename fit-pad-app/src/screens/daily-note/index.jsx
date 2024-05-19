import { useEffect, useRef, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import {
  AppButton,
  AppInput,
  AppTextArea,
  AppTitle,
  PageContainer,
} from '@components'
import { AgendaProvider, useAgenda, useSession, useSnackbar } from '@providers'
import { useDailyNoteService } from '@services'
import { FORM_FIELDS, INITIAL_FORM } from './constants'
import { USER_TYPE } from '@constants'

export function DailyNoteScreen() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [isLoading, setIsLoading] = useState(false)
  const descriptionRef = useRef()
  const {
    currentAgenda,
    handleAgendaCreation,
    refreshAgendas,
    fetchDailyNotes,
    currentDailyNotes,
  } = useAgenda()
  const { createDailyNote, updateDailyNote } = useDailyNoteService()
  const { showErrorMessage, showSuccessMessage } = useSnackbar()
  const { dailyNoteId } = useLocalSearchParams()
  const {
    userData: { userType },
  } = useSession()

  useEffect(() => {
    if (dailyNoteId) {
      const currentDailyNote = currentDailyNotes?.find(
        ({ id }) => id == dailyNoteId
      )

      setFormData({ ...currentDailyNote })
    }
  }, [dailyNoteId])

  function handleInputChange(name, value) {
    setFormData({ ...formData, [name]: value })
  }

  async function handleUpdateDailyNote() {
    try {
      await updateDailyNote(dailyNoteId, formData)
      setFormData(INITIAL_FORM)
      showSuccessMessage('Anotação editada com sucesso.')
      router.back()
      await fetchDailyNotes()
    } catch {
      showErrorMessage('Erro ao atualizar anotação diária.')
    }
  }

  async function handleCreateDailyNote(agendaId) {
    try {
      await createDailyNote(agendaId, formData)
      setFormData(INITIAL_FORM)
      showSuccessMessage('Anotação criada com sucesso.')
      router.back()
    } catch {
      showErrorMessage('Erro ao criar anotação diária.')
    }
  }

  async function handleClickSubmit() {
    setIsLoading(true)

    if (dailyNoteId) {
      await handleUpdateDailyNote()
    } else {
      if (currentAgenda) {
        handleCreateDailyNote(currentAgenda.id)
        await fetchDailyNotes()
      } else {
        const agendaId = await handleAgendaCreation()
        if (agendaId) await handleCreateDailyNote(agendaId)
        await refreshAgendas()
      }
    }

    setIsLoading(false)
  }

  return (
    <AgendaProvider>
      <PageContainer>
        <AppTitle>Anotação Diária</AppTitle>
        <AppInput
          label='Título'
          onChange={(text) => handleInputChange(FORM_FIELDS.TITLE, text)}
          value={formData[FORM_FIELDS.TITLE]}
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => descriptionRef.current.focus()}
          readOnly={userType === USER_TYPE.NUTRITIONIST}
        />
        <AppTextArea
          onChange={(text) => handleInputChange(FORM_FIELDS.DESCRIPTION, text)}
          inputRef={descriptionRef}
          value={formData[FORM_FIELDS.DESCRIPTION]}
          readOnly={userType === USER_TYPE.NUTRITIONIST}
        />
        {userType === USER_TYPE.PATIENT && (
          <AppButton isLoading={isLoading} onPress={handleClickSubmit}>
            Salvar
          </AppButton>
        )}
      </PageContainer>
    </AgendaProvider>
  )
}
