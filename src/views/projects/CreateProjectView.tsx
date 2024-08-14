import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ProjectForm from "../../components/projects/ProjectForm";
import { ProjectFormData } from "../../types";
import { createProject } from "../../api/ProjectAPI";

export const CreateProjectView = () => {
  const navegate = useNavigate();

  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response) => {
      toast.success(response);
      navegate("/");
    },
  });

  const handlForm = (data: ProjectFormData) => mutate(data);

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold">Crear Proyecto</h1>
        <p className="text-xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para crear un proyecto
        </p>
        <nav className="my-5">
          <Link
            to={"/"}
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-xl text-white font-bold cursor-pointer transition-colors"
          >
            Volver a Proyectos
          </Link>
        </nav>
        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handlForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value="Crear Proyecto"
            className="bg-fuchsia-600 w-full text-white uppercase p-3 hover:bg-fuchsia-700 font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};
