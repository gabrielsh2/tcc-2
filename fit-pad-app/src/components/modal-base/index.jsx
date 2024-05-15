import { Modal, Portal } from 'react-native-paper'
import { style } from './styles'

export function ModalBase({ isOpen, onDismiss, children }) {
  return (
    <Portal>
      <Modal
        visible={isOpen}
        onDismiss={onDismiss}
        contentContainerStyle={style.modal}
      >
        {children}
      </Modal>
    </Portal>
  )
}
