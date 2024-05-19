import { SelectList } from 'react-native-dropdown-select-list'
import { COLORS, FONTS } from '@constants'

export function AppSelect({
  data,
  save = 'key',
  setSelected,
  placeholder = '',
}) {
  return (
    <SelectList
      data={data}
      save={save}
      setSelected={setSelected}
      placeholder={placeholder}
      search={false}
      fontFamily={FONTS.CLASH_GROTESTK_REGULAR}
      boxStyles={{
        width: '100%',
        height: 60,
        alignItems: 'center',
        borderRadius: 0,
        paddingLeft: 15,
        borderWidth: 0,
        borderBottomWidth: 0.8,
        borderBottomColor: COLORS.UNDERLINE,
      }}
      dropdownStyles={{
        borderRadius: 5,
        borderWidth: 0.8,
        borderColor: COLORS.UNDERLINE,
      }}
      dropdownTextStyles={{
        fontSize: 16,
      }}
      dropdownItemStyles={{
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: COLORS.LIGHT_GRAY,
      }}
      inputStyles={{
        fontSize: 16,
      }}
    />
  )
}
