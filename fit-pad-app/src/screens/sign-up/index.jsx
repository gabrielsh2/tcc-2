import { useRef, useState } from 'react'
import {
  AppButton,
  AppInput,
  AppRadio,
  AppText,
  PageContainer,
} from '@components'
import { useAuthService } from '@services'
import { useSnackbar } from '@providers'
import { isRequiredFieldsFilled } from '@utils'
import { FORM_FIELDS, INITIAL_FORM, USER_TYPE_OPTIONS } from './constants'

export function SignUpScreen() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const { registerUser } = useAuthService()
  const { showErrorMessage, showSuccessMessage } = useSnackbar()
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
        await registerUser(formData)
        setFormData(INITIAL_FORM)
        showSuccessMessage('Conta registrada com sucesso!')
      } catch (error) {
        showErrorMessage(error?.response?.data?.message)
      }
    } else {
      showErrorMessage('Preencha todos os campos para prosseguir.')
    }
  }

  return (
    <PageContainer>
      <AppText variant='headlineLarge' textAlign='center   '>
        Vamos Começar!
      </AppText>
      <AppText>Preencha o formuláro para criar sua conta no Fit Pad!</AppText>
      <AppInput
        autocomplete='name'
        label='Nome Completo'
        onChange={(text) => handleInputChange(FORM_FIELDS.FULL_NAME, text)}
        value={formData[FORM_FIELDS.FULL_NAME]}
        returnKeyType='next'
        onSubmitEditing={() => emailRef.current.focus()}
      />
      <AppInput
        label='E-mail'
        autocomplete='email'
        inputMode='email'
        onChange={(text) => handleInputChange(FORM_FIELDS.EMAIL, text)}
        value={formData[FORM_FIELDS.EMAIL]}
        returnKeyType='next'
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
      <AppButton onPress={handleSubmit}>Cadastrar</AppButton>
    </PageContainer>
  )
}
