import React from "react";
import ProjectModal from "../components/Modals/ProjectModal";
import Button from "../components/Button/Button";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import Table from "../components/ProjectTable";

const Home = () => {
  return (
    <div>
      <Navbar title="ProMage - Projects" />
      <div className="container mx-auto">
        <div className="flex justify-between my-6 mr-4">
          <h1 className="text-3xl font-semibold">Projects</h1>
          <Button buttonName="New Project" />
        </div>
        <ProjectModal />
        <Table />
        <Pagination />
      </div>
    </div>
  );
};

export default Home;
