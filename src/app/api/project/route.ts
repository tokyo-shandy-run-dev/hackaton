import { PrismaClient } from "@prisma/client";
import { NextApiResponse, NextApiRequest } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "GET": // プロジェクトの閲覧
        const projects = await prisma.project.findMany();
        return res.status(200).json({ message: "Success", projects });

      case "POST": // プロジェクトの作成
        const { title, duration_start, duration_end, total_hours } = req.body;
        const createdProject = await prisma.project.create({
          data: { title, duration_start, duration_end, total_hours },
        });
        return res.status(201).json({ message: "Project created successfully", project: createdProject });

      case "PUT": // プロジェクトの変更
        const { projectId, updatedData } = req.body;
        const updatedProject = await prisma.project.update({
          where: { id: projectId },
          data: updatedData,
        });
        return res.status(200).json({ message: "Project updated successfully", project: updatedProject });

      case "DELETE": // プロジェクトの削除
        const { projectIdToDelete } = req.body;
        await prisma.project.delete({ where: { id: projectIdToDelete } });
        return res.status(200).json({ message: "Project deleted successfully" });

      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}