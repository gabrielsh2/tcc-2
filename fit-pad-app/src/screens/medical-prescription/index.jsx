import { useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import {
  AppButton,
  AppText,
  AppTitle,
  ListItem,
  PageContainer,
} from '@components'
import { ROUTES, USER_TYPE } from '@constants'
import { useMedicalPrescription, useSession } from '@providers'

export function MedicalPrescriptionScreen() {
  const { medicalPrescriptions, fetchData } = useMedicalPrescription()
  const { id } = useLocalSearchParams()
  const {
    userData: { userType },
  } = useSession()

  useEffect(() => {
    fetchData()
  }, [])

  function handleClickMedicalPrescription(medicalPrescriptionId) {
    router.navigate({
      pathname: ROUTES.CREATE_MEDICAL_PRESCRIPTION,
      params: {
        id,
        medicalPrescriptionId,
      },
    })
  }

  function handleClickCreateButton() {
    router.navigate({
      pathname: ROUTES.CREATE_MEDICAL_PRESCRIPTION,
      params: {
        id,
      },
    })
  }

  return (
    <PageContainer>
      <AppTitle>Prescrições Médicas</AppTitle>
      {medicalPrescriptions.map(({ title, id }, index) => (
        <ListItem
          index={index}
          key={index}
          onPress={() => handleClickMedicalPrescription(id)}
        >
          <AppText>{title}</AppText>
        </ListItem>
      ))}
      {userType === USER_TYPE.NUTRITIONIST && (
        <AppButton onPress={handleClickCreateButton}>
          Criar Prescrição
        </AppButton>
      )}
    </PageContainer>
  )
}
