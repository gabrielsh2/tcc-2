import { useEffect, useRef, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import {
  AppButton,
  AppInput,
  AppTextArea,
  AppTitle,
  PageContainer,
} from '@components'
import { USER_TYPE } from '@constants'
import { useMedicalPrescription, useSession, useSnackbar } from '@providers'
import { useMedicalPrescriptionService } from '@services'
import { FORM_FIELDS, INITIAL_FORM } from './constants'

export function CreateMedicalPrescriptionScreen() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [isLoading, setIsLoading] = useState(false)
  const descriptionRef = useRef()
  const {
    userData: { userType },
  } = useSession()
  const { showErrorMessage, showSuccessMessage } = useSnackbar()
  const { medicalPrescriptions, fetchData } = useMedicalPrescription()
  const { createMedicalPrescription, updateMedicalPrescription } =
    useMedicalPrescriptionService()
  const { id: patientId, medicalPrescriptionId } = useLocalSearchParams()

  useEffect(() => {
    const currentPrescription = medicalPrescriptions.find(
      ({ id }) => medicalPrescriptionId == id
    )

    if (currentPrescription) {
      setFormData(currentPrescription)
    }
  }, [medicalPrescriptionId])

  function handleInputChange(name, value) {
    setFormData({ ...formData, [name]: value })
  }

  async function handleUpdateMedicalPrescription() {
    try {
      await updateMedicalPrescription(medicalPrescriptionId, formData)
      await fetchData()
      router.back()
      setFormData(INITIAL_FORM)
      showSuccessMessage('Prescrição médica editada com sucesso.')
    } catch {
      showErrorMessage('Erro ao atualizar prescrição médica.')
    }
  }

  async function handleCreateMedicalPrescription() {
    try {
      await createMedicalPrescription(patientId, formData)
      await fetchData()
      router.back()
      setFormData(INITIAL_FORM)
      showSuccessMessage('Prescrição médica criada com sucesso.')
    } catch {
      showErrorMessage('Erro ao criar prescrição médica.')
    }
  }

  async function handleClickSubmit() {
    if (formData[FORM_FIELDS.TITLE]) {
      setIsLoading(true)

      if (medicalPrescriptionId) {
        await handleUpdateMedicalPrescription()
      } else {
        await handleCreateMedicalPrescription()
      }

      setIsLoading(false)
    } else {
      showErrorMessage('Título deve ser preenchido.')
    }
  }

  return (
    <PageContainer>
      <AppTitle>Prescrição Médica</AppTitle>
      <AppInput
        label='Título'
        onChange={(text) => handleInputChange(FORM_FIELDS.TITLE, text)}
        value={formData[FORM_FIELDS.TITLE]}
        returnKeyType='next'
        blurOnSubmit={false}
        onSubmitEditing={() => descriptionRef.current.focus()}
        readOnly={userType === USER_TYPE.PATIENT}
      />
      <AppTextArea
        onChange={(text) => handleInputChange(FORM_FIELDS.DESCRIPTION, text)}
        inputRef={descriptionRef}
        value={formData[FORM_FIELDS.DESCRIPTION]}
        readOnly={userType === USER_TYPE.PATIENT}
      />
      {userType === USER_TYPE.NUTRITIONIST && (
        <AppButton isLoading={isLoading} onPress={handleClickSubmit}>
          Salvar
        </AppButton>
      )}
    </PageContainer>
  )
}
