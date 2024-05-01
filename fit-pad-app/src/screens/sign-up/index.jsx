import { Text } from 'react-native'
import { useState } from 'react'
import { AppButton, AppInput, AppSelect, PageContainer } from '@components'
import { USER_TYPE_LABEL } from '@constants'
import { useAuthService } from '@services'
import { FORM_FIELDS, USER_TYPE_OPTIONS } from './constants'

export function SignUpScreen() {
  const [formData, setFormData] = useState({})
  const { registerUser } = useAuthService()

  function handleSelectType({ value }) {
    setFormData({ ...formData, [FORM_FIELDS.USER_TYPE]: value })
  }

  function handleInputChange(name, value) {
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit() {
    registerUser(formData)
  }

  return (
    <PageContainer>
      <Text>Vamos Começar!</Text>
      <Text>Preencha o formuláro e crie sua conta no Fit Pad!</Text>
      <AppSelect
        options={USER_TYPE_OPTIONS}
        onPress={handleSelectType}
        title='Tipo de Usuário'
        selected={USER_TYPE_LABEL[formData[FORM_FIELDS.USER_TYPE]]}
      />
      <AppInput
        label='Nome Completo'
        onChange={(text) => handleInputChange(FORM_FIELDS.FULL_NAME, text)}
        value={formData[FORM_FIELDS.FULL_NAME]}
      />
      <AppInput
        label='E-mail'
        onChange={(text) => handleInputChange(FORM_FIELDS.EMAIL, text)}
        value={formData[FORM_FIELDS.EMAIL]}
      />
      <AppInput
        label='Senha'
        onChange={(text) => handleInputChange(FORM_FIELDS.PASSWORD, text)}
        value={formData[FORM_FIELDS.PASSWORD]}
      />
      <AppButton onPress={handleSubmit}>Cadastrar</AppButton>
    </PageContainer>
  )
}
