import React, { Suspense } from "react";
import { ConfirmAccount } from "~/components/shared/auth";

const Page = () => {
  return (
    <Suspense>
      <ConfirmAccount />
    </Suspense>
  );
};

export default Page;
