"use client";

import React from "react";

type ButtonProps = {
  apiBaseUrl: string | undefined;
};

export default function Button({ apiBaseUrl }: ButtonProps) {
  const makeApiCall = async () => {
    const res = await fetch(`${apiBaseUrl}/members`);
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <button onClick={makeApiCall}>Fetch Data</button>
    </div>
  );
}
