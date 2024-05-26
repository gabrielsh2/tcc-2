import { useEffect, useState } from 'react'
import { Chip } from 'react-native-paper'
import { router, useLocalSearchParams } from 'expo-router'
import {
  AppButton,
  AppInput,
  AppText,
  AppTitle,
  PageContainer,
} from '@components'
import { useMealRecordService } from '@services'
import { useAgenda, useSession, useSnackbar } from '@providers'
import { COLORS, USER_TYPE } from '@constants'
import {
  ActionsContainer,
  MealItemsContainer,
  MealsContainer,
  StyledAdd,
  StyledRemove,
} from './styles'

export function MealRecordScreen() {
  const [selectedMealType, setSelectedMealType] = useState('')
  const [mealItems, setMealItems] = useState([
    {
      name: '',
      quantity: '',
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const { mealRecordId } = useLocalSearchParams()
  const {
    currentAgenda,
    fetchMealRecords,
    currentMealRecords,
    handleAgendaCreation,
    refreshAgendas,
  } = useAgenda()
  const { showErrorMessage, showSuccessMessage } = useSnackbar()
  const { createMealRecord, updateMealRecord } = useMealRecordService()
  const {
    userData: { userType },
  } = useSession()

  useEffect(() => {
    if (mealRecordId) {
      const currentMealRecord = currentMealRecords?.find(
        ({ id }) => id == mealRecordId
      )

      setSelectedMealType(currentMealRecord.mealType)
      setMealItems(currentMealRecord.mealRecordItems)
    }
  }, [mealRecordId])

  function getMealTypeOptions() {
    return ['Café da Manhã', 'Almoço', 'Lanche', 'Jantar']
  }

  function isFormValid() {
    const everyItemHasName = mealItems.every(
      ({ name, quantity }) => name && quantity
    )
    const hasItems = mealItems.length

    return everyItemHasName && hasItems
  }

  function handleMealItemChange(field, value, index) {
    const newMealItems = [...mealItems]
    newMealItems[index][field] = value
    setMealItems(newMealItems)
  }

  function handleClickAdd() {
    const newMealItems = [...mealItems, { name: '', quantity: '' }]
    setMealItems(newMealItems)
  }

  function handleClickRemove() {
    const newMealItems = [...mealItems]
    newMealItems.pop()
    setMealItems(newMealItems)
  }

  async function handleCreateMealRecord(agendaId) {
    try {
      await createMealRecord(agendaId, {
        mealType: selectedMealType,
        mealItems,
      })
      await fetchMealRecords()
      router.back()
      setMealItems([
        {
          name: '',
          quantity: '',
        },
      ])
      setSelectedMealType('')
      showSuccessMessage('Refeição registrada com sucesso.')
    } catch {
      showErrorMessage('Erro ao registrar refeição.')
    }
  }

  async function handleUpdateMealRecord() {
    try {
      await updateMealRecord(mealRecordId, {
        mealType: selectedMealType,
        mealItems,
      })
      await fetchMealRecords()
      router.back()
      setMealItems([
        {
          name: '',
          quantity: '',
        },
      ])
      setSelectedMealType('')
      showSuccessMessage('Refeição editada com sucesso.')
    } catch (error) {
      showErrorMessage('Erro ao atualizar refeição.')
    }
  }

  async function handleSubmitMealRecord() {
    setIsLoading(true)

    if (isFormValid()) {
      if (mealRecordId) {
        await handleUpdateMealRecord()
      } else {
        if (currentAgenda) {
          handleCreateMealRecord(currentAgenda.id)
          await fetchMealRecords()
        } else {
          const agendaId = await handleAgendaCreation()
          if (agendaId) await handleCreateMealRecord(agendaId)
          await refreshAgendas()
        }
      }
    } else {
      showErrorMessage('Preencha corretamente os alimentos da refeição.')
    }

    setIsLoading(false)
  }

  function renderMealItems() {
    return mealItems.map(({ name, quantity }, index) => (
      <MealItemsContainer key={index}>
        <AppInput
          label='Alimento*'
          value={name}
          onChange={(text) => handleMealItemChange('name', text, index)}
          customStyle={{ flex: 1 }}
          readOnly={userType === USER_TYPE.NUTRITIONIST}
        />
        <AppInput
          label='Quantidade*'
          value={quantity}
          onChange={(text) => handleMealItemChange('quantity', text, index)}
          customStyle={{ width: 110 }}
          readOnly={userType === USER_TYPE.NUTRITIONIST}
        />
      </MealItemsContainer>
    ))
  }

  function renderMealTypes() {
    const mealTypes = getMealTypeOptions()

    return (
      <MealsContainer>
        {mealTypes.map((mealType, index) => (
          <Chip
            key={index}
            selected={mealType === selectedMealType}
            onPress={() => {
              if (userType === USER_TYPE.PATIENT) setSelectedMealType(mealType)
            }}
            showSelectedCheck={false}
            showSelectedOverlay={true}
          >
            {mealType}
          </Chip>
        ))}
      </MealsContainer>
    )
  }

  return (
    <PageContainer>
      <AppTitle>Refeição</AppTitle>
      {userType === USER_TYPE.PATIENT && (
        <AppText>Selecione um tipo de refeição:</AppText>
      )}
      {renderMealTypes()}
      {!!selectedMealType && (
        <>
          {userType === USER_TYPE.PATIENT && (
            <AppText>Preencha os alimentos:</AppText>
          )}
          {renderMealItems()}
          {userType === USER_TYPE.PATIENT && (
            <>
              <ActionsContainer>
                <StyledRemove icon='minus' onPress={handleClickRemove} />
                <StyledAdd C icon='plus' onPress={handleClickAdd} />
              </ActionsContainer>
              <AppButton isLoading={isLoading} onPress={handleSubmitMealRecord}>
                Salvar
              </AppButton>
            </>
          )}
        </>
      )}
    </PageContainer>
  )
}
