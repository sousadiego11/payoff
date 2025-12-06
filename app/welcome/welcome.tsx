import { ProductCards } from "../components/ProductCards";
import logo from "../assets/logo-icon.png";

export function Welcome() {
  return (
    <main className="flex flex-col">
      <header className="px-48 py-18 flex items-center justify-between bg-neutral-100">
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
      <section className="px-48 py-18 bg-neutral-200">
        <ProductCards
          onCheckout={(p) => console.log(JSON.stringify(p))}
          onPayIntent={(p) => console.log(JSON.stringify(p))}
        />
      </section>
    </main>
  );
}