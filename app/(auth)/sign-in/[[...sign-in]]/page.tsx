import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function SignInRoute() {
  return (
    <div>
      <SignIn />
    </div>
  );
}
