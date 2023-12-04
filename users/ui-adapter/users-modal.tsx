"use client";
import { useClerk } from "@clerk/nextjs";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import React from "react";
import UsersAddModal from "./user-add-modal";
import UserDeleteModal from "./user-delete-modal";
import UserEditModal from "./user-edit-modal";

export default function UsersModal({
  isOpen,
  onOpenChange,
  modalVersion,
}: any) {
  return (
    <div>
      {modalVersion === "add" && (
        <UsersAddModal isOpen={isOpen} onOpenChange={onOpenChange} />
      )}
      {modalVersion === "edit" && (
        <UserEditModal isOpen={isOpen} onOpenChange={onOpenChange} />
      )}
      {modalVersion === "delete" && (
        <UserDeleteModal isOpen={isOpen} onOpenChange={onOpenChange} />
      )}
    </div>
  );
}
