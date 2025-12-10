import { Link, useNavigate, useNavigation } from "react-router";
import { Header } from "~/components/header";
import { ProductsList } from "~/components/products-list";
import type { Route } from "../+types/root";
import { useUserSession } from "~/hooks/useUserSession";
import PurchasesCard from "~/components/purchases-list";
import { usePurchases } from "~/hooks/usePurchases";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Payoff" }
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [pLoading, purchases] = usePurchases()
  const session = useUserSession();

  const isLoading = navigation.state !== "idle";

  return (
    <main className="min-h-screen bg-linear-to-br from-indigo-50 via-blue-100 to-purple-200">
      {/* Header */}
      <section className="px-48 pt-18">
        <Header />
      </section>

      {/* Layout dos 2 cards unificados */}
      <section className="px-48 pt-18">
        <div className="flex gap-8">
          <div className="flex-1 ">
            <ProductsList
              onCheckout={(p) => navigate(`/checkout/${p.id}/${session}`)}
              onPayIntent={(p) => navigate(`/payment-intent/${p.id}/${session}`)}
            />
          </div>
          <div>
            <PurchasesCard purchases={purchases} />
          </div>
        </div>
      </section>
    </main>
  );
}
