import React, { Suspense } from "react";
import { ForgotPassword } from "~/components/shared/auth";

const Page = () => {
  return (
    <Suspense>
      <ForgotPassword />
    </Suspense>
  );
};

export default Page;
