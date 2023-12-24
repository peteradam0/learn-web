"use client";

import React from "react";

import OrganizationDeleteModal from "./organization-delete-modal";
import OrganizationCreateModal from "./organization-create-modal";
import OrganizationAuthModal from "./organization-auth-modal";
export default function OrganizationModal({
  isOpen,
  onOpenChange,
  modalVersion,
  handleDeleteOrganization,
  organization,
}: any) {
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
      {modalVersion === "auth" && (
        <OrganizationAuthModal isOpen={isOpen} onOpenChange={onOpenChange} />
      )}
    </div>
  );
}
