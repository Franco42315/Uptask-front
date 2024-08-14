import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import { ProjectFormData } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateProject } from "../../api/ProjectAPI";

type EditProjectFormProps = {
  data: ProjectFormData
}

export const EditProjectForm = ({data} : EditProjectFormProps) => {
  const navegate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  console.log(data);
  

  const initialValues: ProjectFormData = {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({queryKey:['projects']})
      queryClient.invalidateQueries({queryKey:["editProject", projectId]})
      toast.success(response)
      navegate("/")
    },
  });

  const handlForm = (formData: ProjectFormData) => {
    const data = {
      formData,
      projectId
    }
    mutate(data)
  };
  
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold">Editar Proyecto</h1>
        <p className="text-xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para editar un proyecto
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
          <ProjectForm 
            register={register} 
            errors={errors} 
          />
          <input
            type="submit"
            value="Guardar Cambios"
            className="bg-fuchsia-600 w-full text-white uppercase p-3 hover:bg-fuchsia-700 font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
