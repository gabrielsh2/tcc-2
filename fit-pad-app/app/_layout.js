import { Slot } from 'expo-router'
import { PaperProvider, configureFonts, useTheme } from 'react-native-paper'
import { useFonts } from 'expo-font'
import { SessionProvider, SnackbarProvider } from '@providers'
import { FONTS, FONTS_CONFIG, THEME_COLORS } from '@constants'

import AsyncStorage from '@react-native-async-storage/async-storage'

// Função para limpar o AsyncStorage
const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear()
    console.log('AsyncStorage limpo com sucesso!')
  } catch (error) {
    console.error('Erro ao limpar o AsyncStorage:', error)
  }
}

// Chame a função quando desejar limpar o AsyncStorage

export default function Layout() {
  // clearAsyncStorage()
  const [loaded] = useFonts({
    [FONTS.CLASH_GROTESTK_REGULAR]: require('../assets/fonts/ClashGrotesk-Regular.ttf'),
    [FONTS.CLASH_GROTESTK_SEMIBOLD]: require('../assets/fonts/ClashGrotesk-Semibold.ttf'),
  })
  const theme = useTheme()

  function getFontConfig() {
    const baseVariants = configureFonts({ config: FONTS_CONFIG.BASE })
    const customVariants = {
      headlineLarge: {
        ...baseVariants.headlineLarge,
        ...FONTS_CONFIG.HEADLINE_LARGE,
      },
    }

    const fonts = configureFonts({
      config: {
        ...baseVariants,
        ...customVariants,
      },
    })

    return fonts
  }

  function getTheme() {
    const customTheme = {
      ...theme,
      fonts: getFontConfig(),
      colors: {
        ...theme.colors,
        ...THEME_COLORS,
      },
    }

    return customTheme
  }

  if (!loaded) {
    return null
  }

  return (
    <PaperProvider theme={getTheme()}>
      <SnackbarProvider>
        <SessionProvider>
          <Slot />
        </SessionProvider>
      </SnackbarProvider>
    </PaperProvider>
  )
}
