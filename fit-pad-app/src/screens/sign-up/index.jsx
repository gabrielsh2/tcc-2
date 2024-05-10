import { useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import {
  AppButton,
  AppInput,
  AppRadio,
  AppText,
  AppTitle,
  PageContainer,
} from '@components'
import { useAuthService } from '@services'
import { useSession, useSnackbar } from '@providers'
import { isRequiredFieldsFilled } from '@utils'
import { USER_DEFAULT_ROUTE, USER_TYPE_OPTIONS } from '@constants'
import { FORM_FIELDS, INITIAL_FORM } from './constants'

export function SignUpScreen() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [isLoading, setIsLoading] = useState(false)
  const { registerUser } = useAuthService()
  const { showErrorMessage, showSuccessMessage } = useSnackbar()
  const { saveSession } = useSession()
  const router = useRouter()
  const emailRef = useRef()
  const passwordRef = useRef()

  function handleSelectType(value) {
    setFormData({ ...formData, [FORM_FIELDS.USER_TYPE]: value })
  }

  function handleInputChange(name, value) {
    setFormData({ ...formData, [name]: value })
  }

  async function handleSubmit() {
    if (isRequiredFieldsFilled(Object.keys(formData), formData)) {
      try {
        setIsLoading(true)

        const { data: userData } = await registerUser(formData)
        const userType = formData[FORM_FIELDS.USER_TYPE]

        await saveSession({
          ...userData,
          userType,
        })
        setFormData(INITIAL_FORM)
        showSuccessMessage('Conta registrada com sucesso!')
        router.navigate({
          pathname: USER_DEFAULT_ROUTE[userType],
          params: { id: userData.userId },
        })
      } catch (error) {
        showErrorMessage(error?.response?.data?.message)
      } finally {
        setIsLoading(false)
      }
    } else {
      showErrorMessage('Preencha todos os campos para prosseguir.')
    }
  }

  return (
    <PageContainer>
      <AppTitle>Vamos Começar!</AppTitle>
      <AppText>Preencha o formulário para criar sua conta no Fit Pad!</AppText>
      <AppInput
        autocomplete='name'
        label='Nome Completo'
        onChange={(text) => handleInputChange(FORM_FIELDS.FULL_NAME, text)}
        value={formData[FORM_FIELDS.FULL_NAME]}
        returnKeyType='next'
        blurOnSubmit={false}
        onSubmitEditing={() => emailRef.current.focus()}
      />
      <AppInput
        label='E-mail'
        autocomplete='email'
        inputMode='email'
        onChange={(text) => handleInputChange(FORM_FIELDS.EMAIL, text)}
        value={formData[FORM_FIELDS.EMAIL]}
        returnKeyType='next'
        blurOnSubmit={false}
        inputRef={emailRef}
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <AppInput
        label='Senha'
        autocomplete='new-password'
        secureTextEntry
        onChange={(text) => handleInputChange(FORM_FIELDS.PASSWORD, text)}
        value={formData[FORM_FIELDS.PASSWORD]}
        inputRef={passwordRef}
      />
      <AppRadio
        options={USER_TYPE_OPTIONS}
        onPress={handleSelectType}
        title='Selecione seu tipo de usuário'
        value={formData[FORM_FIELDS.USER_TYPE]}
      />
      <AppButton onPress={handleSubmit} isLoading={isLoading}>
        Cadastrar
      </AppButton>
    </PageContainer>
  )
}
