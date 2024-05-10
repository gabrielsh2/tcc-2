import { useRef, useState } from 'react'
import {
  AppButton,
  AppInput,
  AppLink,
  AppRadio,
  AppText,
  AppTitle,
  PageContainer,
  PasswordInput,
} from '@components'
import { useAuthService } from '@services'
import { useSession, useSnackbar } from '@providers'
import { isRequiredFieldsFilled } from '@utils'
import {
  ROUTES,
  USER_DEFAULT_ROUTE,
  USER_TYPE,
  USER_TYPE_OPTIONS,
} from '@constants'
import { FORM_FIELDS, INITIAL_FORM } from './constants'
import { useNavigation, useRouter } from 'expo-router'

export function SignInScreen() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuthService()
  const { showErrorMessage } = useSnackbar()
  const { saveSession } = useSession()
  const navigation = useNavigation()
  const router = useRouter()
  const passwordRef = useRef()

  function handleSelectType(value) {
    setFormData({ ...formData, [FORM_FIELDS.USER_TYPE]: value })
  }

  function handleInputChange(name, value) {
    setFormData({ ...formData, [name]: value })
  }

  function clearHistory() {
    const state = navigation.getState()
    navigation.reset({
      ...state,
      routes: state.routes.map((route) => ({ ...route, state: undefined })),
    })
  }

  async function handleSubmit() {
    if (isRequiredFieldsFilled(Object.keys(formData), formData)) {
      try {
        setIsLoading(true)

        const { data: userData } = await login(formData)
        const userType = formData[FORM_FIELDS.USER_TYPE]

        await saveSession({
          ...userData,
          userType,
        })
        setFormData(INITIAL_FORM)
        router.navigate({
          pathname: USER_DEFAULT_ROUTE[userType],
          params: { id: userData.userId },
        })
      } catch (error) {
        showErrorMessage('E-mail ou senha incorretos.')
      } finally {
        setIsLoading(false)
      }
    } else {
      showErrorMessage('Preencha todos os campos para prosseguir.')
    }
  }

  return (
    <PageContainer>
      <AppTitle>Bem-vindo de volta!</AppTitle>
      <AppText>Preencha os dados da sua conta no Fit Pad!</AppText>
      <AppInput
        label='E-mail'
        autocomplete='email'
        inputMode='email'
        onChange={(text) => handleInputChange(FORM_FIELDS.EMAIL, text)}
        value={formData[FORM_FIELDS.EMAIL]}
        returnKeyType='next'
        blurOnSubmit={false}
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <PasswordInput
        inputRef={passwordRef}
        onChange={(text) => handleInputChange(FORM_FIELDS.PASSWORD, text)}
        value={formData[FORM_FIELDS.PASSWORD]}
      />
      <AppRadio
        options={USER_TYPE_OPTIONS}
        onPress={handleSelectType}
        title='Selecione seu tipo de usuário'
        value={formData[FORM_FIELDS.USER_TYPE]}
      />
      <AppButton onPress={handleSubmit} isLoading={isLoading}>
        Entrar
      </AppButton>
      <AppText>
        Novo(a) por aqui?{' '}
        <AppLink href={ROUTES.SIGN_UP}>Clique aqui para se registrar</AppLink>
      </AppText>
    </PageContainer>
  )
}
