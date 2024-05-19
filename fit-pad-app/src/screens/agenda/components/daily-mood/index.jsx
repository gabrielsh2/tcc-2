import { useEffect, useState } from 'react'
import EmojiPicker from 'rn-emoji-keyboard'
import { pt } from 'rn-emoji-keyboard'
import { AppText } from '@components'
import { useAgenda, useSession, useSnackbar } from '@providers'
import { useAgendaService } from '@services'
import { EmojiContainer, StyledPressable, StyledView, style } from './styles'
import { USER_TYPE } from '@constants'

export function DailyMood() {
  const [isOpen, setIsOpen] = useState(false)
  const [dailyMood, setDailyMood] = useState('')
  const { currentAgenda, handleAgendaCreation, refreshAgendas } = useAgenda()
  const { registerMoodEmoji } = useAgendaService()
  const { showErrorMessage } = useSnackbar()
  const {
    userData: { userType },
  } = useSession()

  useEffect(() => {
    const currentMoodEmoji = currentAgenda?.moodEmoji

    setDailyMood(currentMoodEmoji)
  }, [currentAgenda])

  async function handleOnEmojiSelected({ emoji }) {
    if (currentAgenda) {
      registerEmoji(currentAgenda.id, emoji)
    } else {
      const agendaId = await handleAgendaCreation()
      if (agendaId) registerEmoji(agendaId, emoji)
    }
  }

  async function registerEmoji(agendaId, moodEmoji) {
    try {
      await registerMoodEmoji(agendaId, { moodEmoji })
      refreshAgendas()
    } catch {
      showErrorMessage('Erro ao registrar o humor do dia.')
    }
  }

  return (
    <>
      <StyledPressable
        disabled={userType === USER_TYPE.NUTRITIONIST}
        onPress={() => setIsOpen(true)}
      >
        <StyledView>
          <AppText fullWidth={false}>Humor do dia</AppText>
          <EmojiContainer style={style.emojiContainer}>
            <AppText fullWidth={false} variant='titleLarge'>
              {dailyMood}
            </AppText>
          </EmojiContainer>
        </StyledView>
      </StyledPressable>
      <EmojiPicker
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onEmojiSelected={handleOnEmojiSelected}
        translation={pt}
        enableRecentlyUsed
        categoryPosition='top'
      />
    </>
  )
}
