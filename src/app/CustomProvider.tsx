"use client";

import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

import React from 'react'

type Props = {
    children: React.ReactNode;
}

export default function CustomProvider({children}: Props) {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}