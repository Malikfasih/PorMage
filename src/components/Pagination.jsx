import React from "react";
import { useProjects } from "../context/projects";

const ExampleComponent = () => {
  const { projects, loading, currentPage, totalPages, nextPage, prevPage } =
    useProjects();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <>
        {projects.length ? (
          <div className="flex justify-end mt-4 mr-4">
            <button
              type="button"
              className="flex rounded-full bg-gray-700 w-32 text-white text-lg pl-7 mr-5 font-semibold py-2"
              onClick={prevPage}
              disabled={currentPage === 1 ? true : false}
            >
              previous
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              className="flex rounded-full bg-gray-700 w-32 text-white text-lg pl-12 font-semibold py-2"
              onClick={nextPage}
              disabled={currentPage === totalPages ? true : false}
            >
              next
            </button>
          </div>
        ) : null}
      </>
    </div>
  );
};

export default ExampleComponent;
