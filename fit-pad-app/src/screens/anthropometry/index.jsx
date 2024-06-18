import { useEffect } from 'react'
import { AppButton, AppText, AppTitle, PageContainer } from '@components'
import { useAnthropometry, useSession } from '@providers'
import {
  AnthropometryItem,
  AnthropometryListContainer,
  StyledContainer,
} from './styles'
import {
  ANTHROPOMETRY_DEFAULT_FIELD_LIST,
  ANTHROPOMETRY_FIELDS,
  ANTHROPOMETRY_LABELS,
  CIRCUNFERENCES_FIELDS,
  COLORS,
  ROUTES,
  SKINFOLDS_FIELDS,
  USER_TYPE,
} from '@constants'
import { formatDateToDisplay } from '@utils'
import { IconButton } from 'react-native-paper'
import { router, useLocalSearchParams } from 'expo-router'
import { DayBar } from './components'

export function AnthropometryScreen() {
  const { fetchAnthropometry, currentAnthropometry } = useAnthropometry()
  const {
    userData: { userType },
  } = useSession()
  const { id } = useLocalSearchParams()

  useEffect(() => {
    fetchAnthropometry()
  }, [])

  function fieldMapper(field) {
    if (field === ANTHROPOMETRY_FIELDS.REGISTER_DATE) {
      return formatDateToDisplay(currentAnthropometry[field])
    }

    return currentAnthropometry[field]
  }

  function handleCreateRegister() {
    router.navigate({
      pathname: ROUTES.CREATE_ANTHROPOMETRY,
      params: {
        id,
      },
    })
  }

  function handleEdit() {
    router.navigate({
      pathname: ROUTES.CREATE_ANTHROPOMETRY,
      params: {
        id,
        anthropometryId: currentAnthropometry.id,
      },
    })
  }

  function renderDefaultFields() {
    return (
      <AnthropometryListContainer>
        {ANTHROPOMETRY_DEFAULT_FIELD_LIST.map((field, index) => (
          <AnthropometryItem
            key={index}
            backgroundColor={
              index % 2 === 0 ? COLORS.PRIMARY_LIGHT : COLORS.SECONDARY_YELLOW
            }
          >
            <AppText variant='bodyBold' fullWidth={false}>
              {ANTHROPOMETRY_LABELS[field]}
            </AppText>
            <AppText fullWidth={false}>{fieldMapper(field)}</AppText>
          </AnthropometryItem>
        ))}
      </AnthropometryListContainer>
    )
  }

  function renderCircunfereceFields() {
    return (
      <AnthropometryListContainer>
        {CIRCUNFERENCES_FIELDS.map((field, index) => (
          <AnthropometryItem
            key={index}
            backgroundColor={
              index % 2 === 0 ? COLORS.PRIMARY_LIGHT : COLORS.SECONDARY_YELLOW
            }
          >
            <AppText variant='bodyBold' fullWidth={false}>
              {ANTHROPOMETRY_LABELS[field]}
            </AppText>
            <AppText fullWidth={false}>{currentAnthropometry[field]}</AppText>
          </AnthropometryItem>
        ))}
      </AnthropometryListContainer>
    )
  }

  function renderSkinfoldFields() {
    return (
      <AnthropometryListContainer>
        {SKINFOLDS_FIELDS.map((field, index) => (
          <AnthropometryItem
            key={index}
            backgroundColor={
              index % 2 === 0 ? COLORS.PRIMARY_LIGHT : COLORS.SECONDARY_YELLOW
            }
          >
            <AppText variant='bodyBold' fullWidth={false}>
              {ANTHROPOMETRY_LABELS[field]}
            </AppText>
            <AppText fullWidth={false}>{currentAnthropometry[field]}</AppText>
          </AnthropometryItem>
        ))}
      </AnthropometryListContainer>
    )
  }

  return (
    <PageContainer>
      <AppTitle>Antropometria</AppTitle>
      {currentAnthropometry && (
        <>
          <DayBar />
          <StyledContainer>
            <AppText fullWidth={false}>Registro Atual:</AppText>
            {userType === USER_TYPE.NUTRITIONIST && (
              <IconButton icon='pencil' onPress={handleEdit} />
            )}
          </StyledContainer>
          {renderDefaultFields()}
          <AppText>Circunferências:</AppText>
          {renderCircunfereceFields()}
          <AppText>Pregas Cutâneas:</AppText>
          {renderSkinfoldFields()}
        </>
      )}
      {userType === USER_TYPE.NUTRITIONIST && (
        <AppButton onPress={handleCreateRegister}>Criar Registro</AppButton>
      )}
    </PageContainer>
  )
}
