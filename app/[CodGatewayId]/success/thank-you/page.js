import React from "react";

import Link from "next/link";
import Wrapper from "@/app/components/Wrapper";

export default function ThankYouPage({ params }) {
    const { CodGatewayId } = params

  return (
    <div className="min-h-[650px] flex items-center">
      <Wrapper>
        <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
          <div className="text-2xl font-bold">Thanks for shopping with us!</div>
          <div className="text-lg font-bold mt-2">
            Your order has been placed successfully.
          </div>
          <div className="text-base mt-5">
            For any product related query, drop an email to
          </div>
          <div className="underline">shoeshopcontact@shop.com
          </div>

          <div className="font-bold text-lg">{`Your Order Id : ${CodGatewayId}`}
          </div>

          <Link href="/" className="font-bold mt-5">
            Continue Shopping
          </Link>
        </div>
        
      </Wrapper>
    </div>
  );
};
