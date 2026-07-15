"use cache";
import KanbanBoard from "@/components/canban-board";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function getBoard(userId: string) {
    "use cache";

    // кэшируется глобально, поэтому повторные вызовы не создают новые соединения.
    await connectDB();

    // Основной запрос в базу.
    // Используем .populate() двух уровней:
    // Board → columns → jobApplications
    // Это позволяет получить все данные за один запрос.
    const boardDoc = await Board.findOne({
        userId: userId,
        name: "Job Hunt",
    }).populate({
        path: "columns",
        populate: {
            path: "jobApplications",
        },
    });

    if (!boardDoc) return null;

    // Самое важное место в функции.
    // Mongoose возвращает специальный объект-документ, который НЕЛЬЗЯ
    // передавать напрямую в Client Component.
    // JSON.parse(JSON.stringify(...)) полностью сериализует данные:
    // - ObjectId → string
    // - Date → ISO string
    // - Убирает все методы Mongoose и внутренние свойства ($__, _doc и т.д.)
    // После этого объект можно безопасно передавать в Client Component.
    const board = JSON.parse(JSON.stringify(boardDoc));

    // Возвращаем обычный JavaScript объект (plain object).
    return board;
}
// ============================================
// Основной компонент страницы (статическая оболочка)
// ============================================
export default function Dashboard() {
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-black">Job Hunt</h1>
                    <p className="text-gray-600">Track your job applications</p>
                </div>

                {/* Динамическая часть обернута в Suspense */}
                <Suspense fallback={<DashboardSkeleton />}>
                    <DashboardContent />
                </Suspense>
            </div>
        </div>
    );
}

// ============================================
// Динамическая часть (здесь вызывается getSession)
// ============================================
async function DashboardContent() {
    const session = await getSession();

    if (!session?.user) {
        redirect("/sign-in");
    }

    const board = await getBoard(session.user.id);

    return <KanbanBoard board={board} userId={session.user.id} />;
}

// Простой скелетон (можно улучшить позже)
function DashboardSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-96 bg-gray-100 rounded-lg"></div>
                ))}
            </div>
        </div>
    );
}
