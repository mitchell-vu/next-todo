"use client";

import { cn } from "@/utils/classnames";
import { Circle, PencilSimpleLine, Trash } from "@phosphor-icons/react/dist/ssr";
import { Todo as TodoModel } from "@prisma/client";
import React from "react";
import { deleteTodo, editTodo } from "./Todo.actions";
import { useForm } from "react-hook-form";

interface TodoProps {
  todo: TodoModel;
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const [editMode, setEditMode] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  const { register, getValues } = useForm({
    defaultValues: {
      title: todo.title,
    },
  });

  const handleEdit = async () => {
    setIsEditing(true);
    await editTodo(todo.id, { title: getValues("title") });
    setIsEditing(false);
    setEditMode(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteTodo(todo.id);
    setIsDeleting(false);
  };

  return (
    <div
      className={cn(
        "flex border rounded-2xl bg-white p-3 flex-row  items-center justify-between gap-2"
      )}
    >
      {!editMode && (
        <>
          <p className="pl-1 grow">{todo.title}</p>

          <div className="flex flex-row gap-2">
            <button
              className="rounded-md border p-2 w-8 h-8 flex justify-center items-center hover:border-orange-500 transition-all"
              onClick={() => setEditMode(true)}
            >
              <PencilSimpleLine size={20} />
            </button>
            <button
              className={cn(
                "rounded-md border p-2 w-8 h-8 flex justify-center items-center hover:border-orange-500 transition-all",
                "disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500"
              )}
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? <Circle size={20} /> : <Trash size={20} />}
            </button>
          </div>
        </>
      )}
      {editMode && (
        <>
          <input
            type="text"
            className="border outline-none grow rounded-md px-2 h-8"
            {...register("title")}
          />

          <div className="flex flex-row gap-2 shrink-0">
            <button
              className="text-sm font-semibold shrink-0 rounded-md border px-2 py-1 h-8 flex justify-center items-center hover:border-orange-500 transition-all"
              onClick={() => setEditMode(false)}
              disabled={isEditing}
            >
              Cancel
            </button>
            <button
              className={cn(
                "text-sm font-semibold shrink-0 rounded-md border px-2 py-1 h-8 flex justify-center items-center transition-all",
                "bg-orange-500 text-white hover:bg-orange-600 border-orange-300",
                "disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500"
              )}
              onClick={handleEdit}
              disabled={isEditing}
            >
              Done
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Todo;
