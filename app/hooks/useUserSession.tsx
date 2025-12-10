import { useEffect, useState } from "react";

export function useUserSession(keyName = "user_session") {
    const [userKey, setUserKey] = useState<string | null>(null);

    useEffect(() => {
        let key = localStorage.getItem(keyName);

        if (!key) {
            key = crypto.randomUUID();
            localStorage.setItem(keyName, key);
        }

        setUserKey(key);
    }, [keyName]);

    return userKey;
}
