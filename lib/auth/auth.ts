import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { initializeUserBoard } from "../init-user-board";

// Подключение к MongoDB для Better Auth.
const client = new MongoClient(process.env.MONGODB_URI as string);

if (!client) {
    throw new Error("MONGODB_URI is not defined");
}

const db = client.db();

// Инициализация Better Auth с MongoDB адаптером.
export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client,
    }),
    emailAndPassword: {
        enabled: true,
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 дней
        updateAge: 60 * 60 * 24, // раз в сутки обновлять
        cookieCache: {
            enabled: true,
            maxAge: 15 * 60, // ← кэшируем сессию в cookie на 15 минут
        },
    },
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    if (user.id) {
                        // Инициализация доски пользователя после создания учетной записи.
                        await initializeUserBoard(user.id);
                    }
                },
            },
        },
    },
});

// Получение текущей сессии пользователя на сервере.
export async function getSession() {
    const result = await auth.api.getSession({
        headers: await headers(),
    });

    return result;
}

export async function signOut() {
    const result = await auth.api.signOut({
        headers: await headers(),
    });

    if (result.success) {
        redirect("/sign-in");
    }
}
