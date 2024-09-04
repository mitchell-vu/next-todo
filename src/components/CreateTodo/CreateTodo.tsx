"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { create } from "./CreateTodo.actions";

export interface CreateTodoFormAttributes {
  title: string;
}

const CreateTodo: React.FC = () => {
  const { register, reset, handleSubmit } = useForm<CreateTodoFormAttributes>();
  const [isCreating, setIsCreating] = React.useState(false);

  const handleFormSubmit: SubmitHandler<CreateTodoFormAttributes> = async (formData) => {
    setIsCreating(true);
    await create(formData);
    setIsCreating(false);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-row gap-2 w-full items-stretch"
    >
      <input
        type="text"
        className="border-2 outline-none grow rounded-xl p-3"
        {...register("title")}
      />
      <button
        type="submit"
        className="rounded-xl p-3 px-4 bg-orange-600 text-white border-2 border-orange-400 font-semibold disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500"
        disabled={isCreating}
      >
        {isCreating ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default CreateTodo;
