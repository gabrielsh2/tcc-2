import { Button, Dialog, Portal } from 'react-native-paper'

export function DialogBase({
  isOpen = false,
  onDismiss = () => {},
  onConfirm = () => {},
  title = '',
  children,
}) {
  return (
    <Portal>
      <Dialog
        visible={isOpen}
        onDismiss={onDismiss}
        dismissable
        dismissableBackButton
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>{children}</Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancelar</Button>
          <Button onPress={onConfirm}>Confirmar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
