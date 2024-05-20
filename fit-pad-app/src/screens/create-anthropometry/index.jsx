import { createRef, useEffect, useRef, useState } from 'react'
import {
  DatePickerModal,
  pt,
  registerTranslation,
} from 'react-native-paper-dates'
import { Portal } from 'react-native-paper'
import { ANTHROPOMETRY_FIELDS, ANTHROPOMETRY_LABELS } from '@constants'
import { AppButton, AppInput, AppTitle, PageContainer } from '@components'
import { formatDateToDisplay } from '@utils'
import { INITIAL_FORM } from './constants'
import { StyledButton } from './styles'
import { useAnthropometryService } from '@services'
import { router, useLocalSearchParams } from 'expo-router'
import { useAnthropometry, useSnackbar } from '@providers'

registerTranslation('pt', pt)

export function CreateAnthropometryScreen() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(INITIAL_FORM)
  const inputRefs = useRef([])
  const { createAnthropometryRegister, updateAnthropometryRegister } =
    useAnthropometryService()
  const { id: patientId, anthropometryId } = useLocalSearchParams()
  const { fetchAnthropometry, currentAnthropometry } = useAnthropometry()
  const { showErrorMessage, showSuccessMessage } = useSnackbar()

  inputRefs.current = Object.values(ANTHROPOMETRY_FIELDS).map(
    (_, index) => (inputRefs.current[index] = createRef())
  )

  useEffect(() => {
    if (anthropometryId) {
      const dataToEdit = { ...formData }
      Object.values(ANTHROPOMETRY_FIELDS).forEach((field) => {
        dataToEdit[field] = currentAnthropometry[field]
      })

      setFormData(dataToEdit)
    }
  }, [anthropometryId])

  function getPickerDate() {
    if (formData[ANTHROPOMETRY_FIELDS.REGISTER_DATE]) {
      const date = new Date(formData[ANTHROPOMETRY_FIELDS.REGISTER_DATE])
      const mappedDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getUTCDate()
      )

      return mappedDate
    }

    return ''
  }

  function handleInputChange(name, value) {
    setFormData({ ...formData, [name]: value })
  }

  function handleConfirmDate({ date }) {
    const correctDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
      .toISOString()
      .slice(0, 10)

    setFormData({
      ...formData,
      [ANTHROPOMETRY_FIELDS.REGISTER_DATE]: correctDate,
    })

    setIsDatePickerOpen(false)
  }

  async function handleUpdateAnthropometry() {
    try {
      await updateAnthropometryRegister(anthropometryId, formData)
      await fetchAnthropometry()
      router.back()
      setFormData(INITIAL_FORM)
      showSuccessMessage('Registro de antropometria alterado com sucesso.')
    } catch (error) {
      console.error(error)
      showErrorMessage('Erro ao atualizar antropometria.')
    }
  }

  async function handleCreateAnthropometry() {
    try {
      await createAnthropometryRegister(patientId, formData)
      await fetchAnthropometry()
      router.back()
      showSuccessMessage('Registro de antropometria criado com sucesso.')
      setFormData(INITIAL_FORM)
    } catch {
      showErrorMessage('Erro ao cadastrar antropometria.')
    }
  }

  async function handleClickSubmit() {
    const everyFieldFilled = Object.values(formData).every((value) => value)

    if (everyFieldFilled) {
      setIsLoading(true)

      if (anthropometryId) {
        await handleUpdateAnthropometry()
      } else {
        await handleCreateAnthropometry()
      }

      setIsLoading(false)
    } else {
      showErrorMessage('Preencha todos os campos.')
    }
  }

  function handleDate(date) {
    if (date) {
      return formatDateToDisplay(date)
    }
  }

  function renderField(field, index) {
    const isLastIndex = index === Object.values(ANTHROPOMETRY_FIELDS).length - 1

    if (field === ANTHROPOMETRY_FIELDS.REGISTER_DATE) {
      return (
        <StyledButton key={index} onPress={() => setIsDatePickerOpen(true)}>
          <AppInput
            value={handleDate(formData[field])}
            label={ANTHROPOMETRY_LABELS[field]}
            readOnly
          />
        </StyledButton>
      )
    }

    return (
      <AppInput
        key={index}
        value={formData[field]}
        label={ANTHROPOMETRY_LABELS[field]}
        onChange={(text) => handleInputChange(field, text)}
        inputRef={inputRefs?.current[index]}
        returnKeyType={isLastIndex ? undefined : 'next'}
        blurOnSubmit={isLastIndex}
        onSubmitEditing={
          isLastIndex
            ? undefined
            : () => inputRefs.current[index + 1].current.focus()
        }
      />
    )
  }

  return (
    <PageContainer>
      <AppTitle>Registrar Antropometria</AppTitle>
      {Object.values(ANTHROPOMETRY_FIELDS).map((field, index) =>
        renderField(field, index)
      )}
      <AppButton onPress={handleClickSubmit} isLoading={isLoading}>
        Salvar
      </AppButton>
      <Portal>
        <DatePickerModal
          presentationStyle='pageSheet'
          locale='pt'
          mode='single'
          visible={isDatePickerOpen}
          onDismiss={() => setIsDatePickerOpen(false)}
          date={getPickerDate()}
          onConfirm={handleConfirmDate}
        />
      </Portal>
    </PageContainer>
  )
}
