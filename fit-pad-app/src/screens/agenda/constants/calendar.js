import { COLORS, FONTS } from '@constants'

export const CALENDAR_LOCALE_CONFIG = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],
  dayNames: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
}

export const CALENDAR_LOCALE = 'br'

export const CALENDAR_THEME = {
  textDayFontSize: 18,
  textMonthFontSize: 18,
  textDayHeaderFontSize: 15,
  textDayFontFamily: FONTS.CLASH_GROTESTK_REGULAR,
  textMonthFontFamily: FONTS.CLASH_GROTESTK_REGULAR,
  textDayHeaderFontFamily: FONTS.CLASH_GROTESTK_REGULAR,
  todayTextColor: COLORS.PRIMARY_COLOR,
  arrowColor: COLORS.PRIMARY_COLOR,
  textSectionTitleColor: COLORS.PRIMARY_COLOR,
}
