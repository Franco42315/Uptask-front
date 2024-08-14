import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation, useParams } from "react-router-dom"
import { getTaskById } from "../../api/TaskAPI"
import EditTaskModal from "./EditTaskModal"

export const EditTaskData = () => {

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('editTask')!
  const params = useParams()
  const projectId = params.projectId!

  const { data, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({
      projectId,
      taskId
    }),
    enabled: !!taskId,
    retry: false,
  });
  
  if(data)
    return <EditTaskModal data={data} taskId={taskId}/>
  
  if(isError)
    return <Navigate to={'/404'}/>
}
