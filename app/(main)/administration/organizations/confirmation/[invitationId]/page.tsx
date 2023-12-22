"use client";

import { confirmInvite } from "@/organizations/api-adapter/create-organization";
import React, { useEffect, useState } from "react";

export default function OrganizationConfirmationPageRoute({ params }: any) {
  const { invitationId } = params;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getOrganizationUserData();
  }, []);

  const getOrganizationUserData = async () => {
    try {
      setLoading(true);
      const res = await confirmInvite(invitationId);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  if (loading) return <p>Loading...</p>;
  return <div>{invitationId}</div>;
}
