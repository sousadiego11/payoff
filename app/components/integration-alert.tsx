import { useState } from "react";

export default function IntegrationAlert() {
    const [isExpanded, setIsExpanded] = useState(false);

    const openAlert = () => {
        setIsExpanded(true);
    };

    const closeAlert = () => {
        setIsExpanded(false);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Botão redondo - aparece quando o alerta está fechado */}
            {!isExpanded && (
                <button
                    onClick={openAlert}
                    className="cursor-pointer w-12 h-12 rounded-full bg-yellow-50 border-2 border-yellow-300 text-yellow-800 shadow-md flex items-center justify-center text-xl hover:bg-yellow-100 transition-colors duration-200"
                    aria-label="Open integration alert"
                >
                    <span>⚠️</span>
                </button>
            )}

            {/* Alerta completo - aparece quando expandido */}
            {isExpanded && (
                <div className="flex flex-col bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-md shadow-md text-sm max-w-sm transition-all duration-300 ease-in-out">
                    {/* Cabeçalho com título e botão X */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">⚠️</span>
                            <div className="font-medium">Test environment only</div>
                        </div>
                        <button
                            onClick={closeAlert}
                            className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-yellow-100 flex items-center justify-center text-yellow-800 transition-colors duration-200"
                            aria-label="Close integration alert"
                        >
                            <span className="cursor-pointer text-lg leading-none">×</span>
                        </button>
                    </div>

                    {/* Descrição */}
                    <div className="text-xs text-yellow-700 mt-1">
                        This site is used solely for Stripe integration testing. Only test keys are used,
                        and no real payments are processed. No data is stored, and features such as
                        authentication, per-user data persistence, or any security mechanisms are not implemented.
                    </div>
                </div>
            )}
        </div>
    );
}
