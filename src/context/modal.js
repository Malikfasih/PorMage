import React, { createContext, useContext, useState } from "react";

// Managing modal state
const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [tasksData, setTasksData] = useState([]);

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        currentProjectId,
        setCurrentProjectId,
        currentTaskId,
        setCurrentTaskId,
        tasksData,
        setTasksData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to consume the modal context
export const useModal = () => useContext(ModalContext);
