import React from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button/Button";
import Details from "../components/Details";
import { useProjects } from "../context/projects";
import Navbar from "../components/Navbar";
import TaskModal from "../components/Modals/TaskModal";
import { useModal } from "../context/modal";
import TaskTable from "../components/TaskTable";

const ProjectDetail = () => {
  const params = useParams();
  const { projects } = useProjects();
  const project = projects.find((project) => project._id === params.id);
  const { setCurrentProjectId } = useModal();
  setCurrentProjectId(project?._id);

  return (
    <>
      <Navbar title={`Project - ${project?.name}`} />
      <div className="container mx-auto">
        <Details project={project} />
        <TaskModal />
        <div className="flex justify-between my-6 mr-4 mt-16">
          <h1 className="text-3xl font-semibold">Tasks</h1>
          <Button buttonName="New Task" />
        </div>
        <TaskTable />;
      </div>
    </>
  );
};

export default ProjectDetail;
