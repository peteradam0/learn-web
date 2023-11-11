"use client";

import React from "react";
import { makeApiCall } from "../api-adapter/get-members";

type ButtonProps = {
  apiBaseUrl: string | undefined;
};

export default function Button({ apiBaseUrl }: ButtonProps) {
  const handleOnClick = makeApiCall(apiBaseUrl);
  return (
    <div>
      <button onClick={() => handleOnClick}>Fetch Data</button>
    </div>
  );
}
