"use client";

import React from "react";
import { getMembers } from "../api-adapter/get-members";

const handleOnClick = async () => {
  console.log(await getMembers());
};

export default function Button() {
  return (
    <div>
      <button onClick={() => handleOnClick()}>Fetch Data</button>
    </div>
  );
}
