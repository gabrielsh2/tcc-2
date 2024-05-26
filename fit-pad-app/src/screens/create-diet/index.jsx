import { useEffect, useState } from 'react'
import { IconButton } from 'react-native-paper'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { router, useLocalSearchParams } from 'expo-router'
import {
  AppButton,
  AppInput,
  AppText,
  AppTextArea,
  AppTitle,
  PageContainer,
} from '@components'
import { COLORS, USER_TYPE } from '@constants'
import { useDiet, useSession, useSnackbar } from '@providers'
import { useDietService } from '@services'
import {
  DEFAULT_MEAL,
  DEFAULT_MEAL_ITEM,
  FIELDS,
  FIELD_LABELS,
  INITIAL_FORM,
} from './constants'
import {
  ActionsContainer,
  MealHeader,
  MealContainer,
  MealItemContainer,
  ObservationsContainer,
  ObservationsLabel,
  StyledAdd,
  StyledCheck,
  StyledRemove,
  MealItemText,
  HeaderActions,
  BottomItems,
  StyledButton,
} from './styles'

export function CreateDietScreen() {
  const [formData, setFormData] = useState({ ...INITIAL_FORM })
  const [pickerData, setPickerData] = useState({
    isOpen: false,
    index: null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { createDiet, updateDiet } = useDietService()
  const { fetchDiets, diets } = useDiet()
  const { showErrorMessage, showSuccessMessage } = useSnackbar()
  const { id: patientId, dietId } = useLocalSearchParams()
  const {
    userData: { userType },
  } = useSession()

  useEffect(() => {
    const selectedDiet = diets.find(({ id }) => dietId == id)

    if (selectedDiet) {
      const selectedDietMeals = selectedDiet.meals.map((meal) => ({
        ...meal,
        isEditing: false,
        type: meal.mealType,
        items: meal.mealItems,
      }))

      setFormData({ ...selectedDiet, [FIELDS.MEALS]: selectedDietMeals })
    }
  }, [dietId])

  function isEditingMeal() {
    return formData[FIELDS.MEALS].some(({ isEditing }) => isEditing)
  }

  function isValidForm() {
    const hasName = formData[FIELDS.NAME]
    const everyMealIsValid = formData[FIELDS.MEALS].every(({ items, type }) => {
      const everyMealItemHasName = items.every(({ name }) => name)

      return everyMealItemHasName && type
    })

    return hasName && everyMealIsValid
  }

  async function handleCreateDiet() {
    try {
      await createDiet(patientId, formData)
      await fetchDiets()
      router.back()
      showSuccessMessage('Dieta criada com sucesso.')
      setFormData({ ...INITIAL_FORM })
    } catch (error) {
      showErrorMessage('Erro ao registrar dieta.')
    }
  }

  async function handleUpdateDiet() {
    try {
      await updateDiet(dietId, formData)
      await fetchDiets()
      router.back()
      setFormData({ ...INITIAL_FORM })
      showSuccessMessage('Dieta atualizada com sucesso.')
    } catch (error) {
      showErrorMessage('Erro ao atualizar dieta.')
    }
  }

  async function handleClickSubmit() {
    if (isValidForm()) {
      setIsLoading(true)

      if (dietId) {
        await handleUpdateDiet()
      } else {
        await handleCreateDiet()
      }

      setIsLoading(false)
    } else {
      showErrorMessage('Preencha corretamente todos os campos obrigatórios.')
    }
  }

  function handleConfirmTimePick(time) {
    handleTimeInputChange(FIELDS.MEAL_TIME, time, pickerData.index)
    setPickerData({ isOpen: false, index: null })
  }

  function handleInputChange(name, value) {
    setFormData({ ...formData, [name]: value })
  }

  function handleTimeInputChange(name, value, index) {
    const newMeals = formData[FIELDS.MEALS].map((meal) => {
      const mealItems = meal.items.map((item) => ({ ...item }))
      return {
        ...meal,
        items: mealItems,
      }
    })

    newMeals[index][name] = value.toTimeString().split(' ')[0]

    setFormData({ ...formData, meals: newMeals })
  }

  function handleMealChange(name, value, index) {
    const newMeals = formData[FIELDS.MEALS].map((meal) => {
      const mealItems = meal.items.map((item) => ({ ...item }))
      return {
        ...meal,
        items: mealItems,
      }
    })

    newMeals[index][name] = value

    setFormData({ ...formData, meals: newMeals })
  }

  function handleMealItemChange(name, value, mealIndex, index) {
    const newMeals = formData[FIELDS.MEALS].map((meal) => {
      const mealItems = meal.items.map((item) => ({ ...item }))
      return {
        ...meal,
        items: mealItems,
      }
    })

    newMeals[mealIndex][FIELDS.MEAL_ITEMS][index][name] = value

    setFormData({ ...formData, meals: newMeals })
  }

  function handleClickRemove(index) {
    const currentMealItems = formData[FIELDS.MEALS][index][FIELDS.MEAL_ITEMS]
    const newMealItems = currentMealItems.slice(0, currentMealItems.length - 1)

    const meals = formData[FIELDS.MEALS].map((field, fieldIndex) => {
      if (fieldIndex === index) {
        return {
          ...field,
          items: newMealItems,
        }
      }
      return field
    })

    setFormData({ ...formData, [FIELDS.MEALS]: meals })
  }

  function handleClickAdd(index) {
    const mealItems = [
      ...formData[FIELDS.MEALS][index][FIELDS.MEAL_ITEMS],
      {
        ...DEFAULT_MEAL_ITEM,
      },
    ]

    const meals = formData[FIELDS.MEALS].map((field, fieldIndex) => {
      if (fieldIndex === index) {
        return {
          ...field,
          items: mealItems,
        }
      }
      return field
    })

    setFormData({ ...formData, [FIELDS.MEALS]: meals })
  }

  function handleClickCheck(index) {
    const currentMeal = formData[FIELDS.MEALS][index]
    const currentMealItems = currentMeal[FIELDS.MEAL_ITEMS]

    const everyNameIsFilled = currentMealItems.every(({ name }) => name)
    const everyFieldIsEmpty = currentMealItems.every(({ name }) => !name)
    const hasMealType = currentMeal[FIELDS.MEAL_TYPE]

    if (everyNameIsFilled && hasMealType) {
      currentMeal[FIELDS.IS_EDITING] = false
      setFormData({ ...formData })
    } else if (everyFieldIsEmpty && !hasMealType) {
      const newMeals = formData[FIELDS.MEALS].slice(0, index)
      setFormData({ ...formData, [FIELDS.MEALS]: newMeals })
    } else {
      showErrorMessage('Preencha todos os campos obrigatórios da refeição.')
    }
  }

  function handleClickMealTime(index) {
    setPickerData({ isOpen: true, index })
  }

  function handleRemoveMeal(index) {
    const currentMeals = formData[FIELDS.MEALS]
    const newMeals = [
      ...currentMeals.slice(0, index),
      ...currentMeals.slice(index + 1),
    ]

    setFormData({ ...formData, [FIELDS.MEALS]: newMeals })
  }

  function handleEditMeal(index) {
    const currentMeals = formData[FIELDS.MEALS]
    const newMeals = [
      ...currentMeals.slice(0, index),
      {
        ...currentMeals[index],
        [FIELDS.IS_EDITING]: true,
      },
      ...currentMeals.slice(index + 1),
    ]

    setFormData({ ...formData, [FIELDS.MEALS]: newMeals })
  }

  function handleClickAddNewMeal() {
    const newMeal = [{ ...DEFAULT_MEAL }]
    const meals = [...formData[FIELDS.MEALS], ...newMeal]

    setFormData({ ...formData, [FIELDS.MEALS]: meals })
  }

  function renderMealItemsInput(mealIndex) {
    return formData[FIELDS.MEALS][mealIndex][FIELDS.MEAL_ITEMS].map(
      (mealItem, index) => (
        <MealItemContainer key={index}>
          <AppInput
            label={FIELD_LABELS.MEAL_ITEM_NAME}
            value={mealItem[FIELDS.NAME]}
            onChange={(text) =>
              handleMealItemChange(FIELDS.NAME, text, mealIndex, index)
            }
            customStyle={{ flex: 1 }}
          />
          <AppInput
            label={FIELD_LABELS[FIELDS.QUANTITY]}
            value={mealItem[FIELDS.QUANTITY]}
            onChange={(text) =>
              handleMealItemChange(FIELDS.QUANTITY, text, mealIndex, index)
            }
            customStyle={{ width: 110 }}
          />
        </MealItemContainer>
      )
    )
  }

  function renderMealInputs(index) {
    return (
      <MealContainer key={index}>
        <MealHeader index={index}>
          <StyledButton onPress={() => handleClickMealTime(index)}>
            <AppInput
              value={formData[FIELDS.MEALS][index][FIELDS.MEAL_TIME].slice(
                0,
                5
              )}
              label={FIELD_LABELS[FIELDS.MEAL_TIME]}
              readOnly
            />
          </StyledButton>
          <AppInput
            label={FIELD_LABELS[FIELDS.MEAL_TYPE]}
            value={formData[FIELDS.MEALS][index][FIELDS.MEAL_TYPE]}
            onChange={(text) => handleMealChange(FIELDS.MEAL_TYPE, text, index)}
            customStyle={{ flex: 1 }}
            activeUnderlineColor={COLORS.TEXT_COLOR}
          />
        </MealHeader>
        {renderMealItemsInput(index)}
        <ActionsContainer>
          <StyledAdd icon='plus' onPress={() => handleClickAdd(index)} />
          <StyledRemove icon='minus' onPress={() => handleClickRemove(index)} />
          <StyledCheck icon='check' onPress={() => handleClickCheck(index)} />
        </ActionsContainer>
      </MealContainer>
    )
  }

  function renderMealData(index) {
    const meal = formData[FIELDS.MEALS][index]

    return (
      <MealContainer key={index}>
        <MealHeader index={index} paddingLeft='20px'>
          <AppText fullWidth={false} style={{ flex: 1 }}>
            {meal[FIELDS.MEAL_TIME]
              ? `${meal[FIELDS.MEAL_TIME].slice(0, 5)} - `
              : ''}
            {meal[FIELDS.MEAL_TYPE]}
          </AppText>
          {!isEditingMeal() && userType === USER_TYPE.NUTRITIONIST && (
            <HeaderActions>
              <IconButton
                icon='pencil'
                onPress={() => handleEditMeal(index)}
                size={20}
                style={{ margin: 0 }}
              />
              <IconButton
                icon='minus'
                onPress={() => handleRemoveMeal(index)}
                size={20}
                style={{ margin: 0 }}
              />
            </HeaderActions>
          )}
        </MealHeader>
        {meal.items.map(({ name, quantity }, itemsIndex) => (
          <MealItemText key={itemsIndex} style={{ paddingHorizontal: 10 }}>
            {'\u2022 '}
            {name}
            {quantity ? ` - ${quantity}` : ''}
          </MealItemText>
        ))}
      </MealContainer>
    )
  }

  function renderMeals() {
    return (
      <>
        {formData[FIELDS.MEALS].map(({ isEditing }, index) => {
          if (isEditing) return renderMealInputs(index)
          else return renderMealData(index)
        })}
        {!isEditingMeal() && userType === USER_TYPE.NUTRITIONIST && (
          <StyledAdd icon='plus' onPress={() => handleClickAddNewMeal()} />
        )}
      </>
    )
  }

  function renderObservations() {
    const isPatientAndHasContent =
      userType === USER_TYPE.PATIENT && !!formData[FIELDS.OBSERVATIONS]
    const shouldDisplayObservations =
      isPatientAndHasContent || userType === USER_TYPE.NUTRITIONIST

    return (
      shouldDisplayObservations && (
        <ObservationsContainer>
          <ObservationsLabel>
            <AppText>{FIELD_LABELS[FIELDS.OBSERVATIONS]}</AppText>
          </ObservationsLabel>
          <AppTextArea
            value={formData[FIELDS.OBSERVATIONS]}
            onChange={(text) => handleInputChange(FIELDS.OBSERVATIONS, text)}
            readOnly={userType === USER_TYPE.PATIENT}
          />
        </ObservationsContainer>
      )
    )
  }

  return (
    <PageContainer>
      <AppTitle>Dieta</AppTitle>
      <AppInput
        label={FIELD_LABELS[FIELDS.NAME]}
        onChange={(text) => handleInputChange(FIELDS.NAME, text)}
        value={formData[FIELDS.NAME]}
        readOnly={userType === USER_TYPE.PATIENT}
      />
      {renderMeals()}
      <BottomItems>
        {renderObservations()}
        {userType === USER_TYPE.NUTRITIONIST && (
          <AppButton onPress={handleClickSubmit} isLoading={isLoading}>
            Salvar
          </AppButton>
        )}
      </BottomItems>
      <DateTimePickerModal
        isVisible={pickerData?.isOpen}
        mode='time'
        onConfirm={handleConfirmTimePick}
        onCancel={() => setPickerData({ ...pickerData, isOpen: false })}
      />
    </PageContainer>
  )
}
