"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { CreateTodoFormAttributes } from "./CreateTodo";

export const create = async ({ title }: CreateTodoFormAttributes) => {
  await axios.post("http://localhost:3000/api/todos", {
    title,
  });

  revalidatePath("/");
};
