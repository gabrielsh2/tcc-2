import { useEffect, useState } from 'react'
import { IconButton } from 'react-native-paper'
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
import { useSubstitutionList } from '@services'
import {
  DEFAULT_FOOD_GROUP,
  DEFAULT_ITEM,
  FIELDS,
  FIELD_LABELS,
  INITIAL_FORM,
} from './constants'
import {
  ActionsContainer,
  GroupHeader,
  GroupContainer,
  GroupItemContainer,
  ObservationsContainer,
  ObservationsLabel,
  StyledAdd,
  StyledCheck,
  StyledRemove,
  GroupItemText,
  HeaderActions,
  BottomItems,
} from './styles'

export function CreateSubstitutionListScreen() {
  const [formData, setFormData] = useState({ ...INITIAL_FORM })
  const [isLoading, setIsLoading] = useState(false)
  const { createSubstitutionList, updateSubstitutionList } =
    useSubstitutionList()
  const { fetchSubstitutionList, substitutionList } = useDiet()
  const { showErrorMessage, showSuccessMessage } = useSnackbar()
  const { id: patientId, substitutionListId } = useLocalSearchParams()
  const {
    userData: { userType },
  } = useSession()

  useEffect(() => {
    if (substitutionList) {
      const listFoodGroups = substitutionList.foodGroups.map(
        ({ name, items }) => ({
          name,
          items,
          isEditing: false,
        })
      )

      setFormData({ ...substitutionList, [FIELDS.FOOD_GROUPS]: listFoodGroups })
    }
  }, [substitutionListId])

  function isEditingGroup() {
    return formData[FIELDS.FOOD_GROUPS].some(({ isEditing }) => isEditing)
  }

  function isValidForm() {
    const everyGroupIsValid = formData[FIELDS.FOOD_GROUPS].every(
      ({ items, name }) => {
        const everyGroupItemHasName = items.every(({ name }) => name)

        return everyGroupItemHasName && name
      }
    )

    return everyGroupIsValid
  }

  async function handleCreateSubstitutionList() {
    try {
      await createSubstitutionList(patientId, formData)
      await fetchSubstitutionList()
      router.back()
      showSuccessMessage('Lista de substituição criada com sucesso.')
      setFormData({ ...INITIAL_FORM })
    } catch (error) {
      showErrorMessage('Erro ao registrar lista de substituição.')
    }
  }

  async function handleUpdateSubstitutionList() {
    try {
      await updateSubstitutionList(substitutionListId, formData)
      await fetchSubstitutionList()
      router.back()
      setFormData({ ...INITIAL_FORM })
      showSuccessMessage('Lista de substituição atualizada com sucesso.')
    } catch (error) {
      showErrorMessage('Erro ao atualizar lista de substituição.')
    }
  }

  async function handleClickSubmit() {
    if (isValidForm()) {
      setIsLoading(true)

      if (substitutionListId) {
        await handleUpdateSubstitutionList()
      } else {
        await handleCreateSubstitutionList()
      }

      setIsLoading(false)
    } else {
      showErrorMessage('Preencha corretamente todos os campos obrigatórios.')
    }
  }

  function handleInputChange(name, value) {
    setFormData({ ...formData, [name]: value })
  }

  function handleGroupChange(name, value, index) {
    const newGroups = formData[FIELDS.FOOD_GROUPS].map((foodGroup) => {
      const groupItems = foodGroup.items.map((item) => ({ ...item }))
      return {
        ...foodGroup,
        items: groupItems,
      }
    })

    newGroups[index][name] = value

    setFormData({ ...formData, [FIELDS.FOOD_GROUPS]: newGroups })
  }

  function handleGroupItemChange(name, value, groupIndex, index) {
    const newGroup = formData[FIELDS.FOOD_GROUPS].map((foodGroup) => {
      const groupItems = foodGroup.items.map((item) => ({ ...item }))
      return {
        ...foodGroup,
        items: groupItems,
      }
    })

    newGroup[groupIndex][FIELDS.ITEMS][index][name] = value

    setFormData({ ...formData, [FIELDS.FOOD_GROUPS]: newGroup })
  }

  function handleClickRemove(index) {
    const currentGroupItems = formData[FIELDS.FOOD_GROUPS][index][FIELDS.ITEMS]
    const newGroupItems = currentGroupItems.slice(
      0,
      currentGroupItems.length - 1
    )

    const foodGroups = formData[FIELDS.FOOD_GROUPS].map((field, fieldIndex) => {
      if (fieldIndex === index) {
        return {
          ...field,
          items: newGroupItems,
        }
      }
      return field
    })

    setFormData({ ...formData, [FIELDS.FOOD_GROUPS]: foodGroups })
  }

  function handleClickAdd(index) {
    const groupItems = [
      ...formData[FIELDS.FOOD_GROUPS][index][FIELDS.ITEMS],
      {
        ...DEFAULT_ITEM,
      },
    ]

    const foodGroups = formData[FIELDS.FOOD_GROUPS].map((field, fieldIndex) => {
      if (fieldIndex === index) {
        return {
          ...field,
          items: groupItems,
        }
      }
      return field
    })

    setFormData({ ...formData, [FIELDS.FOOD_GROUPS]: foodGroups })
  }

  function handleClickCheck(index) {
    const currentGroup = formData[FIELDS.FOOD_GROUPS][index]
    const currentGroupItems = currentGroup[FIELDS.ITEMS]

    const everyNameIsFilled = currentGroupItems.every(({ name }) => name)
    const everyFieldIsEmpty = currentGroupItems.every(({ name }) => !name)
    const hasFields = !!currentGroupItems.length
    const hasGroupName = currentGroup[FIELDS.NAME]

    if (hasFields && everyNameIsFilled && hasGroupName) {
      currentGroup[FIELDS.IS_EDITING] = false
      setFormData({ ...formData })
    } else if (everyFieldIsEmpty && !hasGroupName) {
      const newGroups = formData[FIELDS.FOOD_GROUPS].slice(0, index)
      setFormData({ ...formData, [FIELDS.FOOD_GROUPS]: newGroups })
    } else {
      showErrorMessage('Preencha todos os campos obrigatórios do grupo.')
    }
  }

  function handleRemoveGroup(index) {
    const currentGroups = formData[FIELDS.FOOD_GROUPS]
    const newGroups = [
      ...currentGroups.slice(0, index),
      ...currentGroups.slice(index + 1),
    ]

    setFormData({ ...formData, [FIELDS.FOOD_GROUPS]: newGroups })
  }

  function handleEditGroup(index) {
    const currentGroups = formData[FIELDS.FOOD_GROUPS]
    const newFoodGroups = [
      ...currentGroups.slice(0, index),
      {
        ...currentGroups[index],
        [FIELDS.IS_EDITING]: true,
      },
      ...currentGroups.slice(index + 1),
    ]

    setFormData({ ...formData, [FIELDS.FOOD_GROUPS]: newFoodGroups })
  }

  function handleClickAddNewGroup() {
    const newGroup = [{ ...DEFAULT_FOOD_GROUP }]
    const foodGroups = [...formData[FIELDS.FOOD_GROUPS], ...newGroup]

    setFormData({ ...formData, [FIELDS.FOOD_GROUPS]: foodGroups })
  }

  function renderGroupItemsInput(groupIndex) {
    return formData[FIELDS.FOOD_GROUPS][groupIndex][FIELDS.ITEMS].map(
      (item, index) => (
        <GroupItemContainer key={index}>
          <AppInput
            label={FIELD_LABELS.ITEM_NAME}
            value={item[FIELDS.NAME]}
            onChange={(text) =>
              handleGroupItemChange(FIELDS.NAME, text, groupIndex, index)
            }
            customStyle={{ flex: 1 }}
          />
          <AppInput
            label={FIELD_LABELS[FIELDS.QUANTITY]}
            value={item[FIELDS.QUANTITY]}
            onChange={(text) =>
              handleGroupItemChange(FIELDS.QUANTITY, text, groupIndex, index)
            }
            customStyle={{ width: 110 }}
          />
        </GroupItemContainer>
      )
    )
  }

  function renderFoodGroupInputs(index) {
    return (
      <GroupContainer key={index}>
        <GroupHeader index={index}>
          <AppInput
            label={FIELD_LABELS[FIELDS.NAME]}
            value={formData[FIELDS.FOOD_GROUPS][index][FIELDS.NAME]}
            onChange={(text) => handleGroupChange(FIELDS.NAME, text, index)}
            activeUnderlineColor={COLORS.TEXT_COLOR}
          />
        </GroupHeader>
        {renderGroupItemsInput(index)}
        <ActionsContainer>
          <StyledAdd icon='plus' onPress={() => handleClickAdd(index)} />
          <StyledRemove icon='minus' onPress={() => handleClickRemove(index)} />
          <StyledCheck icon='check' onPress={() => handleClickCheck(index)} />
        </ActionsContainer>
      </GroupContainer>
    )
  }

  function renderGroupData(index) {
    const foodGroup = formData[FIELDS.FOOD_GROUPS][index]

    return (
      <GroupContainer key={index}>
        <GroupHeader index={index} paddingLeft='20px'>
          <AppText fullWidth={false} style={{ flex: 1 }}>
            {foodGroup[FIELDS.NAME]}
          </AppText>
          {!isEditingGroup() && userType === USER_TYPE.NUTRITIONIST && (
            <HeaderActions>
              <IconButton
                icon='pencil'
                onPress={() => handleEditGroup(index)}
                size={20}
                style={{ margin: 0 }}
              />
              <IconButton
                icon='minus'
                onPress={() => handleRemoveGroup(index)}
                size={20}
                style={{ margin: 0 }}
              />
            </HeaderActions>
          )}
        </GroupHeader>
        {foodGroup.items.map(({ name, quantity }, itemsIndex) => (
          <GroupItemText key={itemsIndex} style={{ paddingHorizontal: 10 }}>
            {'\u2022 '}
            {name}
            {quantity ? ` - ${quantity}` : ''}
          </GroupItemText>
        ))}
      </GroupContainer>
    )
  }

  function renderFoodGroups() {
    return (
      <>
        {formData[FIELDS.FOOD_GROUPS].map(({ isEditing }, index) => {
          if (isEditing) return renderFoodGroupInputs(index)
          else return renderGroupData(index)
        })}
        {!isEditingGroup() && userType === USER_TYPE.NUTRITIONIST && (
          <StyledAdd icon='plus' onPress={() => handleClickAddNewGroup()} />
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
      <AppTitle>Lista de Substituição</AppTitle>
      {renderFoodGroups()}
      <BottomItems>
        {renderObservations()}
        {userType === USER_TYPE.NUTRITIONIST && (
          <AppButton onPress={handleClickSubmit} isLoading={isLoading}>
            Salvar
          </AppButton>
        )}
      </BottomItems>
    </PageContainer>
  )
}
