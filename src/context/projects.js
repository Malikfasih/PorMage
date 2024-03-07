import { useState, useContext, createContext, useEffect } from "react";
import { getProjects } from "../api/api";

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const allProjects = async (page) => {
    setLoading(true);
    try {
      const response = await getProjects(page, 8);

      const { totalCount, projects } = response.data;
      setProjects([...projects]);
      setTotalPages(Math.ceil(totalCount / 8));

      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allProjects(currentPage);
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <ProjectContext.Provider
      value={{ projects, loading, currentPage, totalPages, nextPage, prevPage }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

// useProjects hook
const useProjects = () => useContext(ProjectContext);

export { useProjects, ProjectProvider };
