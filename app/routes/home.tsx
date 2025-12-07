import { useNavigate } from "react-router";
import type { Route } from "./+types/home";
import { Header } from "~/components/header";
import { ProductsList } from "~/components/products-list";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Payoff" }
  ];
}

export default function Home() {
  let navigate = useNavigate();

  return (
    <main className="flex flex-col">
      <section className="px-48 py-18 bg-neutral-100">
        <Header />
      </section>
      <section className="px-48 py-18 bg-neutral-200">
        <ProductsList
          onCheckout={(p) => navigate(`/checkout/${p.id}`)}
          onPayIntent={(p) => navigate(`/payment-intent/${p.id}`)}
        />
      </section>
    </main>
  );
}
