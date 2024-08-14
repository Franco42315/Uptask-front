import { useForm } from "react-hook-form";
import { NoteFormData } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";
import { ErrorMessage } from "../ErrorMessage";

export const AddNoteForm = () => {
  const params = useParams();
  const projectId = params.projectId!

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('viewTask')!
  const queryClient = useQueryClient()

  const initialValues: NoteFormData = {
    content: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleAddNote = (formData: NoteFormData) => {
    const data = {
      projectId,
      taskId,
      formData
    }
    mutate(data)
  };

  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response) => {
      toast.success(response);
      queryClient.invalidateQueries({queryKey: ["viewTask", taskId]})
      reset()
    },
  });

  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className="space-y-3"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label className="font-bold" htmlFor="content">
          Crear Nota
        </label>
        <input
          id="content"
          type="text"
          placeholder="Contenido de la nota"
          className="w-full p-3 border border-gray-300"
          {...register("content", {
            required: "El Contenido de la nota es obligatorio",
          })}
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>
      <input
        type="submit"
        value="Crear Nota"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer"
      />
    </form>
  );
};
