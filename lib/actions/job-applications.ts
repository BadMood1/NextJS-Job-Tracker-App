"use server";

import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Board, Column, JobApplication } from "../models";

interface JobApplicationData {
    company: string;
    position: string;
    location?: string;
    notes?: string;
    salary?: string;
    jobUrl?: string;
    columnId: string;
    boardId: string;
    tags?: string[];
    description?: string;
}

export async function createJobApplication(data: JobApplicationData) {
    const session = await getSession();
    if (!session?.user) {
        throw new Error("User is not authenticated");
    }

    await connectDB();

    const { company, position, location, notes, salary, jobUrl, columnId, boardId, tags, description } = data;

    if (!company || !position || !columnId || !boardId) {
        return { error: "Missing required fields" };
    }

    // Verify board ownership
    const board = await Board.findOne({
        _id: boardId,
        userId: session.user.id,
    });

    if (!board) {
        return { error: "Board not found or user does not have permission" };
    }

    // Verify column belongs to board

    const column = await Column.findOne({
        _id: columnId,
        boardId: boardId,
    });

    if (!column) {
        return { error: "Column not found" };
    }

    const maxOrder = (await JobApplication.findOne({ columnId }) // Ищем ОДНУ заявку в этой колонке
        .sort({ order: -1 }) // Сортируем по полю order ПО УБЫВАНИЮ (-1 = от большего к меньшему)
        .select("order") // Возвращаем ТОЛЬКО поле order (экономия трафика и памяти)
        .lean()) as { order: number } | null; // as { order: number } | null — TypeScript-тип: "объект с полем order-число, либо null"
    // ВСЁ ЭТО — находим максимальный order среди заявок в этой колонке, чтобы новую добавить в конец

    const jobApplication = await JobApplication.create({
        company,
        position,
        location,
        notes,
        salary,
        jobUrl,
        columnId,
        boardId,
        userId: session.user.id,
        tags: tags || [],
        description,
        status: "applied",
        order: maxOrder ? maxOrder.order + 1 : 0,
    });

    await Column.findByIdAndUpdate(columnId, {
        $push: { jobApplications: jobApplication._id },
    });
    // Обновляем колонку — добавляем ID новой заявки в массив jobApplications внутри документа Column
    // Это создаёт СВЯЗЬ: колонка теперь "знает" о всех заявках, которые в ней находятся

    return { data: JSON.parse(JSON.stringify(jobApplication)) };
}
