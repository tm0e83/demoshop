'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type AdminSidebarContextType = {
  isExpanded: boolean;
  isMinimized: boolean;
  toggleSidebar: () => void;
  setIsExpanded: (value: boolean) => void;
  toggleMinimized: () => void;
  setIsMinimized: (value: boolean) => void;
}

const AdminSidebarContext = createContext<AdminSidebarContextType | undefined>(undefined);

export function AdminSidebarProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => setIsExpanded((prev) => !prev);
  const toggleMinimized = () => setIsMinimized((prev) => !prev);

  const providerValue = {
    isExpanded,
    isMinimized,
    toggleSidebar,
    toggleMinimized,
    setIsExpanded,
    setIsMinimized 
  };

  return (
    <AdminSidebarContext.Provider value={providerValue}>
      {children}
    </AdminSidebarContext.Provider>
  );
}

export function useAdminSidebar() {
  const context = useContext(AdminSidebarContext);
  if (!context) {
    throw new Error('useAdminSidebar must be used within an AdminSidebarProvider');
  }
  return context;
}