import React, { createContext, useContext, useState } from 'react';

// 전역 티켓 상태 관리 Context
interface TicketContextType {
  ownedQuantities: Array<{ private: number; public: number }>;
  updateOwnedQuantity: (
    idx: number,
    type: 'private' | 'public',
    quantity: number
  ) => void;
  resetOwnedQuantity: (idx: number, type: 'private' | 'public') => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTicketContext must be used within a TicketProvider');
  }
  return context;
};

interface TicketProviderProps {
  children: React.ReactNode;
}

export const TicketProvider = ({ children }: TicketProviderProps) => {
  const [ownedQuantities, setOwnedQuantities] = useState(
    Array.from({ length: 6 }, () => ({ private: 2, public: 0 })) // Private: 2, Public: 0 초기값
  );

  const updateOwnedQuantity = (
    idx: number,
    type: 'private' | 'public',
    quantity: number
  ) => {
    setOwnedQuantities((prev) =>
      prev.map((q, i) =>
        i === idx
          ? {
              ...q,
              [type]: q[type] + quantity,
            }
          : q
      )
    );
  };

  const resetOwnedQuantity = (idx: number, type: 'private' | 'public') => {
    setOwnedQuantities((prev) =>
      prev.map((q, i) =>
        i === idx
          ? {
              ...q,
              [type]: 0,
            }
          : q
      )
    );
  };

  return (
    <TicketContext.Provider
      value={{ ownedQuantities, updateOwnedQuantity, resetOwnedQuantity }}
    >
      {children}
    </TicketContext.Provider>
  );
}; 