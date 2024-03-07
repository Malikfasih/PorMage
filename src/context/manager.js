import { useState, useContext, createContext, useEffect } from "react";
import { getManagers } from "../api/api";

const ManagerContext = createContext();

const ManagerProvider = ({ children }) => {
  const [managers, setManagers] = useState([]);
  const [managerName, setManagerName] = useState(null);

  useEffect(() => {
    // Fetch managers
    const allManagers = async () => {
      try {
        const response = await getManagers();
        setManagers(response.data.managers);
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };
    allManagers();
  }, []);

  return (
    <ManagerContext.Provider
      value={{ managers, setManagers, managerName, setManagerName }}
    >
      {children}
    </ManagerContext.Provider>
  );
};

// useManagers hook
const useManagers = () => useContext(ManagerContext);

export { useManagers, ManagerProvider };
