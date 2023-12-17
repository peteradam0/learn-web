"use client";
import { useRouter } from "next/navigation";

import React from "react";

import OrganizationDeleteModal from "./organization-delete-modal";
import OrganizationCreateModal from "./organization-create-modal";
export default function OrganizationModal({
  isOpen,
  onOpenChange,
  modalVersion,
  handleDeleteOrganization,
  organization,
}: any) {
  const router = useRouter();
  return (
    <div>
      {modalVersion === "create" && (
        <OrganizationCreateModal isOpen={isOpen} onOpenChange={onOpenChange} />
      )}
      {modalVersion === "delete" && (
        <>
          <OrganizationDeleteModal
            handleDeleteOrganization={handleDeleteOrganization}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            organization={organization}
          />
        </>
      )}
      {modalVersion === "edit" && <></>}
    </div>
  );
}
