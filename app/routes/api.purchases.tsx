import { DB } from "~/server/database/Database";

export async function loader({ request }: { request: Request }) {
    const url = new URL(request.url);
    const session = url.searchParams.get("user_session");

    if (!session) {
        return Response.json({ error: "Missing session" }, { status: 400 });
    }

    const db = await DB.make();
    const purchases = await db.getPurchases(session);

    return Response.json(purchases);
}

