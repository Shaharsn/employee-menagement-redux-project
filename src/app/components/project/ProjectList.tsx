import { Project } from "../../types/types";
import ProjectDataTable from "./ProjectDataTable";
import AddIcon from "@mui/icons-material/AddBox";
import ModalPortal from "../UI/ModalPortal";
import useModal from "../../hooks/useModal";
import { useState } from "react";
import ProjectNewEditForm from "./ProjectNewEditForm";
import DeleteModal from "../UI/DeleteModal";
import ProjectEmployees from "./ProjectEmployees";
import { state, deleteProject } from "../../store/slices/projectSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/storeHooks";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderActions,
  CardHeaderTitle,
} from "../styled/Card";
import { IconButton } from "../styled/Button";
import { PlusOutlined } from "@ant-design/icons";

const initProject: Project = {
  id: "-1",
  name: "",
  description: "",
};

const initModalInfo: IModalInfo = {
  type: "NEW",
  header: "New Project",
  project: initProject,
};

interface IModalInfo {
  type: string;
  header: string;
  project: Project;
}

const ProjectList = () => {
  const { isShowing: showProjectModal, toggle: toggleProjectModal } =
    useModal();
  const { isShowing: showDeleteModal, toggle: toggleDeleteModal } = useModal();
  const {
    isShowing: showProjectEmployeesModal,
    toggle: toggleProjectEmployeesModal,
  } = useModal();

  const [modalInfo, setModalInfo] = useState<IModalInfo>(initModalInfo);

  const dispatch = useAppDispatch();
  const projectState = useAppSelector(state);

  const onNew = () => {
    setModalInfo(initModalInfo);
    toggleProjectModal();
  };

  const onEdit = (selectedProject: Project) => {
    setModalInfo({
      type: "UPDATE",
      header: "Update Project",
      project: selectedProject,
    });
    toggleProjectModal();
  };

  const onDelete = (selectedProject: Project) => {
    setModalInfo({
      type: "DELETE",
      header: "Delete Project",
      project: selectedProject,
    });
    toggleDeleteModal();
  };

  const onDeleteConfirm = () => {
    if (modalInfo.project && modalInfo.project.id) {
      dispatch(deleteProject(modalInfo.project.id));
    }
  };

  const onShowProjectEmployee = (selectedProject: Project) => {
    setModalInfo({
      type: "PROJECT_EMPLOYEES",
      header: selectedProject.name + "'s Employees",
      project: selectedProject,
    });
    toggleProjectEmployeesModal();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardHeaderTitle>Projects</CardHeaderTitle>
          <CardHeaderActions>
            <IconButton bg="#707070" color="white" onClick={onNew}>
              <PlusOutlined />
            </IconButton>
          </CardHeaderActions>
        </CardHeader>

        <CardBody>
          <ProjectDataTable
            projects={projectState.projects}
            editProject={onEdit}
            deleteProject={onDelete}
            showProjectEmployee={onShowProjectEmployee}
          />
        </CardBody>
      </Card>

      <ModalPortal
        header={modalInfo.header}
        showModal={showProjectModal}
        closeModal={toggleProjectModal}
      >
        <ProjectNewEditForm
          type={modalInfo.type}
          project={modalInfo.project}
          close={toggleProjectModal}
        />
      </ModalPortal>

      <ModalPortal
        header={modalInfo.header}
        showModal={showDeleteModal}
        closeModal={toggleDeleteModal}
      >
        <DeleteModal
          type="Project"
          name={modalInfo.project.name || ""}
          confirmMethod={onDeleteConfirm}
          closeModal={toggleDeleteModal}
        />
      </ModalPortal>

      <ModalPortal
        header={modalInfo.header}
        showModal={showProjectEmployeesModal}
        closeModal={toggleProjectEmployeesModal}
      >
        <ProjectEmployees
          project={modalInfo.project}
          close={toggleProjectEmployeesModal}
        />
      </ModalPortal>
    </>
  );
};
export default ProjectList;
