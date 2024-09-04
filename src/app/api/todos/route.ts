import prisma from "@/utils/db";

const GET = async () => {
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json({ data: todos });
};

const POST = async (req: Request) => {
  const { title } = await req.json();

  const todo = await prisma.todo.create({
    data: { title },
  });

  return Response.json({ data: todo }, { status: 201 });
};

export { GET, POST };
