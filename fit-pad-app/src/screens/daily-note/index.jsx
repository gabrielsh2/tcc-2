import { useEffect, useRef, useState } from 'react'
import {
  AppButton,
  AppInput,
  AppTextArea,
  AppTitle,
  PageContainer,
} from '@components'
import { DateProvider, useDate, useSnackbar } from '@providers'
import { useDailyNoteService } from '@services'
import { FORM_FIELDS, INITIAL_FORM } from './constants'
import { router, useLocalSearchParams } from 'expo-router'

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
  } = useDate()
  const { createDailyNote, updateDailyNote } = useDailyNoteService()
  const { showErrorMessage } = useSnackbar()
  const { dailyNoteId } = useLocalSearchParams()

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
    <DateProvider>
      <PageContainer>
        <AppTitle>Anotação Diária</AppTitle>
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
    </DateProvider>
  )
}
