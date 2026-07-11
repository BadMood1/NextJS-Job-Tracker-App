import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import { KanbanBoard } from "@/components/canban-board";

export default async function Dashboard() {
    const session = await getSession();

    await connectDB();

    const board = await Board.findOne({
        userId: session?.user.id,
        name: "Job Hunt",
    });

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-black">Job Hunt</h1>
                    <p className="text-gray-600">Track your job applications</p>
                </div>
                {/* <KanbanBoard board={board} userId={session.user.id} /> */}
            </div>
        </div>
    );
}
