"use server";

import { Todo } from "@prisma/client";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const editTodo = async (todoId: Todo["id"], data: Partial<Todo>) => {
  await axios.put(`http://localhost:3000/api/todos/${todoId}`, data);
  revalidatePath("/");
};

export const deleteTodo = async (todoId: Todo["id"]) => {
  await axios.delete(`http://localhost:3000/api/todos/${todoId}`);
  revalidatePath("/");
};
