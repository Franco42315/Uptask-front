import { useDroppable } from "@dnd-kit/core";

type DropTaskProsp = {
  status: string
}

export const DropTask = ({status} : DropTaskProsp) => {

  const { isOver, setNodeRef } = useDroppable({
    id: status
  });

  const style = {
    opacity: isOver ? 0.4 : undefined
  }

  return (
    <div  
      style={style} 
      ref={setNodeRef}
      className="text-xs font-semibold uppercase mt-5 grid place-content-center text-slate-500 p-2 border-dashed border-slate-500 border cursor-pointer">
      Soltar tarea aquí
    </div>
  );
};
