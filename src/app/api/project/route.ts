// #hackaton/src/app/api/project/route.ts

import { PrismaClient } from "@prisma/client";
import { NextApiResponse, NextApiRequest } from "next";

const prisma = new PrismaClient();

// project取得
export async function getProjects(req: NextApiRequest, res: NextApiResponse) {
  try {
    const projects = await prisma.project.findMany();
    return res.status(200).json({ message: "Success", projects });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}

// project作成
export async function createProject(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, duration_start, duration_end, total_hours } = req.body;
    const createdProject = await prisma.project.create({
      data: { title, duration_start, duration_end, total_hours },
    });
    return res.status(201).json({ message: "Project created successfully", project: createdProject });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}

// project編集
export async function updateProject(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { projectId, updatedData } = req.body;
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: updatedData,
    });
    return res.status(200).json({ message: "Project updated successfully", project: updatedProject });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}

// project削除
export async function deleteProject(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { projectIdToDelete } = req.body;
    await prisma.project.delete({ where: { id: projectIdToDelete } });
    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
