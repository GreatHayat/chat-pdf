"use client";

import React, { useEffect } from "react";

interface StripePricingTableProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  "pricing-table-id": string;
  "publishable-key": string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": StripePricingTableProps;
    }
  }
}

export default function StripePricingTable() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = process.env.NEXT_PUBLIC_STRIPE_SRC_CDN as string;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div className="flex flex-1 flex-col w-full">
      <stripe-pricing-table
        pricing-table-id={
          process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID as string
        }
        publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY as string}
        // Will use the following later to caputer the user information to use in webhook
        // client-reference-id={}
        // customer-email={}
      ></stripe-pricing-table>
    </div>
  );
}
