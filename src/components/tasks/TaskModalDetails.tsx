import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTaskById, updateTaskStatus } from "../../api/TaskAPI";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/utils";
import { statusTranslations } from "../../locales/es";
import { TaskStatus } from "../../types";
import { NotesPanel } from "../notes/NotesPanel";

export default function TaskModalDetails() {
  const navegate = useNavigate();
  const location = useLocation();
  const queryparams = new URLSearchParams(location.search);
  const taskId = queryparams.get("viewTask")!;
  const params = useParams();
  const projectId = params.projectId!;

  const queryClient = useQueryClient();

  const show = taskId ? true : false;

  const { data, isError, error } = useQuery({
    queryKey: ["viewTask", taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    retry: false,
    enabled: !!taskId,
  });

  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["viewTask", taskId] });
      queryClient.invalidateQueries({ queryKey: ["viewProject", projectId] });
      toast.success(response);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus;
    const data = {
      projectId,
      taskId,
      status,
    };
    mutate(data);
  };

  if (isError) {
    toast.error(error.message, { toastId: "error" });
    return <Navigate to={`/projects/${projectId}`} />;
  }

  if (data)
    return (
      <>
        <Transition appear show={show} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => navegate(location.pathname, { replace: true })}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/60" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                    <p className="text-sm text-slate-400">
                      Agregada el: {formatDate(data.createdAt)}
                    </p>
                    <p className="text-sm text-slate-400">
                      Última actualización: {formatDate(data.updatedAt)}
                    </p>
                    <Dialog.Title
                      as="h3"
                      className="font-black text-4xl text-slate-600 my-5"
                    >
                      {data.name}
                    </Dialog.Title>
                    <p className="text-lg text-slate-500 mb-2">
                      Descripción: {data.description}
                    </p>

                    {data.completedBy.length ? (
                      <>
                        <p className="font-bolt text-2xl text-slate-600 my-5">
                          Historial de Cambios
                        </p>
                        <ul>
                          {data.completedBy.map((activityLog) => (
                            <li className="list-decimal" key={activityLog._id}>
                              <span className="font-bold text-slate-600">
                                {statusTranslations[activityLog.status]}
                              </span>{" "}
                              por: {activityLog.user.name}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}

                    <div className="my-5 space-y-3">
                      <label className={`font-bold`}>Estado Actual: </label>
                      <select
                        title="Select"
                        defaultValue={data.status}
                        onChange={handleChange}
                        className="w-full p-3 bg-white border border-gray-300"
                      >
                        {Object.entries(statusTranslations).map(
                          ([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <NotesPanel 
                      notes={data.notes}
                    />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}
