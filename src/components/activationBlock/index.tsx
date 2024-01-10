"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useActivateUserQuery } from "../../redux/backendApi";

type ActivationBlockProps = {
  token: string;
};

export const ActivationBlock: React.FC<ActivationBlockProps> = ({ token }) => {
  const router = useRouter();

  const { data, isError } = useActivateUserQuery({ token });

  return <div>ActivationBlock</div>;
};
