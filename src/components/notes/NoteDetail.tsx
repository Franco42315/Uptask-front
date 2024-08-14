import { useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Note } from "../../types";
import { formatDate } from "../../utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

type NoteDetailProps = {
  note: Note;
};

export const NoteDetail = ({ note }: NoteDetailProps) => {
  const { data, isLoading } = useAuth();
  const canDelete = useMemo(
    () => data?._id === note.createdBy._id,
    [data, note.createdBy._id]
  );
  const params = useParams();
  const projectId = params.projectId!;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response) => {
      toast.success(response);
      queryClient.invalidateQueries({ queryKey: ["viewTask", taskId] });
    },
  });

  const handleDeleteNote = (noteId: Note["_id"]) => {
    mutate({ projectId, taskId, noteId });
  };

  if (isLoading) return "Cargando...";
  if (data)
    return (
      <div className="p-3 flex justify-between items-center">
        <div>
          <p>
            {note.content} por:{" "}
            <span className="font-bold">{note.createdBy.email}</span>
          </p>
          <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
        </div>
        {canDelete && (
          <button
            onClick={() => handleDeleteNote(note._id)}
            className="cursor-pointer p-2 bg-red-400 hover:bg-red-500 text-xs text-white font-bold transition-colors"
          >
            Eliminar
          </button>
        )}
      </div>
    );
};
