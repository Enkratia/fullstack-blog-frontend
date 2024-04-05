import { fetchJoinQuery } from "@/fetchApi/fetchApi";
import React from "react";

export const TestComponent: React.FC = async () => {
  const { data } = await fetchJoinQuery();

  console.log(new Date());

  return <div>Test</div>;
};
