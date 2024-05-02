import { Stack } from 'expo-router/stack'
import { PaperProvider, configureFonts, useTheme } from 'react-native-paper'
import { SnackbarProvider } from '@providers'
import { useFonts } from 'expo-font'
import { FONTS, FONTS_CONFIG, THEME_COLORS } from '@constants'

export default function Layout() {
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
        <Stack />
      </SnackbarProvider>
    </PaperProvider>
  )
}
