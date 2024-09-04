import prisma from "@/utils/db";

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  const { title } = await req.json();

  const todo = await prisma.todo.update({
    where: { id },
    data: { title },
  });

  return Response.json({ data: todo });
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  await prisma.todo.delete({
    where: { id },
  });

  return Response.json({ id });
};
