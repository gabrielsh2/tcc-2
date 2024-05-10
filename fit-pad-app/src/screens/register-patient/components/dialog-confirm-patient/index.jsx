import { AppText, DialogBase } from '@components'

export function DialogConfirmPatient({
  modalData,
  setModalData = () => {},
  onConfirm = () => {},
}) {
  return (
    <DialogBase
      isOpen={modalData?.isOpen}
      onDismiss={() => setModalData({ ...modalData, isOpen: false })}
      onConfirm={onConfirm}
      title='Confirmar Paciente'
    >
      <AppText>
        Deseja se vincular com o paciente {modalData?.fullName}?
      </AppText>
    </DialogBase>
  )
}
