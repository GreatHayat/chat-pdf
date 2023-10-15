import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import StripePricingTable from "@/components/stripePricingTable";

export default async function Pricing() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-1 flex-col w-full items-center">
      <div className="text-center mb-12">
        <h2 className="text-xl lg:text-3xl font-bold mb-2">
          Choose the right plan for you
        </h2>
        <p className="text-sm text-gray-700">
          Explore our flexible pricing options that fit your needs. Find the
          <br />
          perfect plan for your budget and requirements.
        </p>
      </div>
      <StripePricingTable user={user} />
    </div>
  );
}
