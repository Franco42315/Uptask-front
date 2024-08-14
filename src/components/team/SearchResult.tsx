import { useParams } from "react-router-dom";
import { addMemberById } from "../../api/TeamApi";
import { TeamMember } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type SearchResultProps = {
  user: TeamMember;
  reset: () => void
};

export const SearchResult = ({ user, reset }: SearchResultProps) => {
  const params = useParams()
  const projectId = params.projectId!
  const queryClient = useQueryClient()
  
  const handleAddMember = () => { 
    const data = {
      projectId,
      id: user._id
    }
    mutate(data) 
  }

  const {mutate} = useMutation({
    mutationFn: addMemberById,
    onError: (error) => {
      toast.error(error.message)
    }, 
    onSuccess: (response) => {
      toast.success(response)
      reset()
      queryClient.invalidateQueries({queryKey: ["projectTeam", projectId]})
    }
  })

  return (
    <>
      <p className="mt-10 font-bold text-center"> Resultado:</p>
      <div className="flex justify-between items-center">
        <p>{user.name}</p>
        <button 
          className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
          onClick={handleAddMember}
        >
          Agregar al Proyecto
        </button>
      </div>
    </>
  );
};
