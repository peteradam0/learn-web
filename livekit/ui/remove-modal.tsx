import { removeUser } from "@/livekit/api-adapter/remove";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export const RemoveModal = ({
  isOpen,
  onOpenChange,
  roomName,
  username,
}: any) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Remove from call user
            </ModalHeader>
            <ModalBody>
              <p>
                By pressing the remove button the user will be kicked out from
                the call
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  removeUser(roomName, username);
                  onClose();
                }}
              >
                Remove
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
