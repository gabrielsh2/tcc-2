import { IconButton } from 'react-native-paper'
import { AppText } from '@components'
import { useAnthropometry } from '@providers'
import { formatDateToDisplay } from '@utils'
import { COLORS } from '@constants'
import { StyledView } from './styles'

export function DayBar() {
  const {
    anthropometryRegisters,
    currentAnthropometry,
    setCurrentAnthropometry,
  } = useAnthropometry()

  function getCurrentAnthropometryIndex() {
    const currentIndex = anthropometryRegisters.findIndex(
      ({ id }) => id === currentAnthropometry?.id
    )

    return currentIndex
  }

  function hasPrevious() {
    const currentIndex = getCurrentAnthropometryIndex()
    console.log(currentIndex, anthropometryRegisters.length)
    return currentIndex !== 0
  }

  function hasNext() {
    const currentIndex = getCurrentAnthropometryIndex()
    return currentIndex !== anthropometryRegisters?.length - 1
  }

  function handleClickPrevious() {
    const currentIndex = getCurrentAnthropometryIndex()
    const previousItem = { ...anthropometryRegisters[currentIndex - 1] }
    setCurrentAnthropometry(previousItem)
  }

  function handleClickNext() {
    const currentIndex = getCurrentAnthropometryIndex()
    const nextItem = { ...anthropometryRegisters[currentIndex + 1] }
    setCurrentAnthropometry(nextItem)
  }

  return (
    <StyledView>
      <IconButton
        icon='menu-left'
        iconColor={COLORS.WHITE}
        onPress={handleClickPrevious}
        disabled={!hasPrevious()}
      />
      <AppText fullWidth={false} color={COLORS.WHITE}>
        {currentAnthropometry
          ? formatDateToDisplay(currentAnthropometry.registerDate)
          : ''}
      </AppText>
      <IconButton
        icon='menu-right'
        iconColor={COLORS.WHITE}
        onPress={handleClickNext}
        disabled={!hasNext()}
      />
    </StyledView>
  )
}
