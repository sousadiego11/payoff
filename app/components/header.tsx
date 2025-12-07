
import logo from "../assets/logo-icon.png";

export function Header() {
    return (
        <header className="flex items-center justify-between">
            <div>
                <h1 className="text-6xl font-semibold">Welcome to Payoff!</h1>
                <p className="text-gray-600">Your payment integration solution</p>
            </div>
            <div className="w-[200px] max-w-[100vw]">
                <img
                    src={logo}
                    alt="React Router"
                    className="block w-full"
                />
            </div>
        </header>
    )
}