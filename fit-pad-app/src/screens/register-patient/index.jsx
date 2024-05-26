import { useEffect, useState } from 'react'
import { AppText, AppTitle, ListItem, PageContainer } from '@components'
import { useNutritionistService, usePatientService } from '@services'
import { useNutritionist, useSession, useSnackbar } from '@providers'
import { DialogConfirmPatient } from './components'
import { router } from 'expo-router'
import { ROUTES } from '@constants'

export function RegisterPatientScreen() {
  const [availablePatients, setAvailablePatients] = useState([])
  const [modalData, setModalData] = useState({
    isOpen: false,
    patientId: null,
    fullName: '',
  })
  const { findAvailablePatients } = usePatientService()
  const { showErrorMessage, showSuccessMessage } = useSnackbar()
  const { bindPatient } = useNutritionistService()
  const { userData } = useSession()
  const { fetchNutritionistPatients } = useNutritionist()

  useEffect(() => {
    async function fetchPatients() {
      try {
        const { data } = await findAvailablePatients()
        setAvailablePatients(data)
      } catch (error) {
        showErrorMessage('Não foi possível encontrar pacientes.')
      }
    }

    fetchPatients()
  }, [])

  function handlePatientClick(patientId, fullName) {
    setModalData({ isOpen: true, patientId, fullName })
  }

  async function handleConfirmPatient() {
    const { userId } = userData
    const { patientId } = modalData

    try {
      await bindPatient(userId, { patientId })
      showSuccessMessage('Paciente vinculado com sucesso!')
      await fetchNutritionistPatients()
      router.navigate(ROUTES.NUTRITIONIST_DASHBOARD)
    } catch (error) {
      showErrorMessage('Não foi possível vincular o paciente.')
    }
  }

  function renderPatients() {
    return availablePatients.map(({ id, fullName }, index) => (
      <ListItem
        key={id}
        index={index}
        onPress={() => handlePatientClick(id, fullName)}
      >
        {fullName}
      </ListItem>
    ))
  }

  return (
    <PageContainer>
      <DialogConfirmPatient
        modalData={modalData}
        setModalData={setModalData}
        onConfirm={handleConfirmPatient}
      />
      <AppTitle>Registar Paciente</AppTitle>
      <AppText>
        Procure por um paciente registrado na base para vincular seu cadastro.
      </AppText>
      {renderPatients()}
    </PageContainer>
  )
}
