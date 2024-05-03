import { useRef, useState } from 'react'
import {
  AppButton,
  AppInput,
  AppLink,
  AppRadio,
  AppText,
  PageContainer,
  PasswordInput,
} from '@components'
import { useAuthService } from '@services'
import { useSnackbar } from '@providers'
import { isRequiredFieldsFilled } from '@utils'
import { USER_TYPE_OPTIONS } from '@constants'
import { FORM_FIELDS, INITIAL_FORM } from './constants'

export function SignInScreen() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuthService()
  const { showErrorMessage, showSuccessMessage } = useSnackbar()
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
        await login(formData)
        setFormData(INITIAL_FORM)
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
      <AppText variant='headlineLarge' textAlign='center'>
        Bem-vindo de volta!
      </AppText>
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
        <AppLink href='/signUp'>Clique aqui para se registrar</AppLink>
      </AppText>
    </PageContainer>
  )
}
