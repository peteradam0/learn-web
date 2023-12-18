"use client";
import { useRouter } from "next/navigation";

import React from "react";

import OrganizationDeleteModal from "./organization-delete-modal";
import OrganizationMemberCreateModal from "./organization-member-create-modal";
export default function OrganizationMemberModal({
  isOpen,
  onOpenChange,
  modalVersion,
  handleDeleteOrganization,
  organization,
}: any) {
  const router = useRouter();
  return (
    <div>
      {modalVersion === "add" && (
        <OrganizationMemberCreateModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
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
    </div>
  );
}
