export default function IntegrationAlert() {
    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="flex flex-col bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-md shadow-md text-sm max-w-sm">

                {/* Título + ícone lado a lado */}
                <div className="flex items-center gap-2">
                    <span className="text-lg">⚠️</span>
                    <div className="font-medium">Test environment only</div>
                </div>

                {/* Descrição */}
                <div className="text-xs text-yellow-700 mt-1">
                    This site is used solely for Stripe integration testing. Only test keys are used,
                    and no real payments are processed. No data is stored, and features such as
                    authentication, per-user data persistence, or any security mechanisms are not implemented.
                </div>
            </div>
        </div>
    );
}
