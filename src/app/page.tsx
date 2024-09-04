import { CreateTodo, Todo } from "@/components";
import { Todo as TodoModel } from "@prisma/client";
import axios from "axios";

const getTodos = async () => {
  try {
    const {
      data: { data: todos },
    } = await axios.get("http://localhost:3000/api/todos");
    return todos as TodoModel[];
  } catch (err) {
    return null;
  }
};

const Home = async () => {
  const todos = await getTodos();

  return (
    <div className="w-screen flex min-h-screen flex-col py-20 bg-gray-100">
      <div className="container flex flex-col gap-6">
        <hgroup className="flex flex-col text-center gap-2">
          <h1 className="text-4xl font-bold">Todo App</h1>
          <p>With NextJS, TailwindCSS, Prisma and MongoDB</p>
        </hgroup>

        <CreateTodo />

        <div className="flex flex-col gap-2">
          {todos?.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
