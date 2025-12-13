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

  const [, purchases] = usePurchases()
  const session = useUserSession();

  return (
    <main className="min-h-screen bg-linear-to-br from-indigo-50 via-blue-100 to-purple-200">
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48 pt-8 sm:pt-12 md:pt-16 lg:pt-18">
        <Header />
      </section>

      <section className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48 pt-8 sm:pt-12 md:pt-16 lg:pt-18 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-1 w-full lg:w-auto">
            <ProductsList
              onCheckout={(p) => navigate(`/checkout/${p.id}/${session}`)}
              onPayIntent={(p) => navigate(`/payment-intent/${p.id}/${session}`)}
            />
          </div>
          <div className="w-full lg:w-auto lg:min-w-[320px]">
            <PurchasesCard purchases={purchases} />
          </div>
        </div>
      </section>
    </main>
  );
}
