import React, { useEffect, useState } from "react";

const Notifications: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const es = new EventSource("http://localhost:8080/sse/notifications");
        // eslint-disable-next-line no-debugger
        debugger
        const handler = (e: MessageEvent) => {
            try {
                // Lấy message đầu tiên nếu có
                const msg = e.data;
                if (msg) {
                    setMessages((prev) => [msg, ...prev]);
                }
            } catch (err) {
                console.error("Invalid SSE payload", err);
            }
        };

        es.addEventListener("fb-comment", handler);

        return () => {
            es.removeEventListener("fb-comment", handler);
            es.close();
        };
    }, []);

    return (
        <div>
            <h2>Facebook Comment Notifications</h2>
            <ul>
                {messages.map((m, i) => (
                    <li key={i}>{m}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
