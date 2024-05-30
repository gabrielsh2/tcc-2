import { Slot } from 'expo-router'
import { PaperProvider, configureFonts, useTheme } from 'react-native-paper'
import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useFonts } from 'expo-font'
import { SessionProvider, SnackbarProvider } from '@providers'
import { FONTS, FONTS_CONFIG, THEME_COLORS } from '@constants'

export default function Layout() {
  const [loaded] = useFonts({
    [FONTS.CLASH_GROTESTK_REGULAR]: require('../assets/fonts/ClashGrotesk-Regular.ttf'),
    [FONTS.CLASH_GROTESTK_SEMIBOLD]: require('../assets/fonts/ClashGrotesk-Semibold.ttf'),
  })
  setDefaultOptions({ locale: ptBR })
  const theme = useTheme()

  function getFontConfig() {
    const baseVariants = configureFonts({ config: FONTS_CONFIG.BASE })
    const customVariants = {
      headlineLarge: {
        ...baseVariants.headlineLarge,
        ...FONTS_CONFIG.HEADLINE_LARGE,
      },
      bodyBold: {
        ...baseVariants.bodyLarge,
        ...FONTS_CONFIG.BODY_BOLD,
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
