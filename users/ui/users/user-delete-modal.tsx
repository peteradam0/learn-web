"use client"
import { queryDeleteUser } from "@/users/api/users/users"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react"
import { useRouter } from "next/navigation"

export default function UserDeleteModal({
  onClose,
  isOpen,
  onOpenChange,
  userId
}: any) {
  const router = useRouter()
  const handleDeleteUser = async (userId: string) => {
    await queryDeleteUser(userId)
  }
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete user
              </ModalHeader>
              <ModalBody>
                <p>Are you sure that you want to delete this user?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>

                <Button
                  color="success"
                  onClick={async () => {
                    handleDeleteUser(userId)
                    onClose()
                    router.refresh()
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
