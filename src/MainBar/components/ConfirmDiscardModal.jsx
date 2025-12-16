import Modal from "../../Shared/components/Modal";
import Button from "../../Shared/components/Button";

function ConfirmDiscardModal({ isModalOpen, setIsModalOpen, onConfirm }) {
  function handleClose(e) {
    setIsModalOpen(false);
  }

  function handleConfirm(e) {
    onConfirm();
    setIsModalOpen(false);
  }

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Confirm Discard!</h2>

        <p className="text-sm text-gray-600">
          Are you sure you want to discard the currently running action?
        </p>

        <div className="flex justify-end gap-2 pt-2">
          <Button onClick={handleClose} label="Cancel" styleVariant="black" />
          <Button onClick={handleConfirm} label="Confirm" styleVariant="red" />
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDiscardModal;
