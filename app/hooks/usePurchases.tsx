import { useEffect, useState } from "react";
import { useUserSession } from "./useUserSession";
import type { PurchaseInformation } from "~/server/database/Database";

export function usePurchases() {
    const session = useUserSession()
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        if (!session) return;

        fetch(`/api/purchases?user_session=${session}`)
            .then(r => r.json())
            .then(setPurchases)
            .finally(() => setLoading(false));
    }, [session]);

    return [loading, purchases] as [boolean, PurchaseInformation[]];
}