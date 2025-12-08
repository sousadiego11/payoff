import { Link, useNavigate, useNavigation } from "react-router";
import { Header } from "~/components/header";
import { ProductsList } from "~/components/products-list";
import type { Route } from "../+types/root";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Payoff" }
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isLoading = navigation.state !== "idle";
  console.log("🚀 ~ Home ~ isLoading:", isLoading)

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
