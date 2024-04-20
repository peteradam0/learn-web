"use client"

import React from "react"
import UsersAddModal from "./user-add-modal"
import UserDeleteModal from "./user-delete-modal"
import UserEditModal from "./user-edit-modal"

export default function UsersModal({
  isOpen,
  onOpenChange,
  modalVersion,
  userId
}: any) {
  return (
    <div>
      {modalVersion === "add" && (
        <UsersAddModal isOpen={isOpen} onOpenChange={onOpenChange} />
      )}
      {modalVersion === "edit" && (
        <UserEditModal isOpen={isOpen} onOpenChange={onOpenChange} userId={userId}/>
      )}
      {modalVersion === "delete" && (
        <UserDeleteModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          userId={userId}
        />
      )}
    </div>
  )
}
