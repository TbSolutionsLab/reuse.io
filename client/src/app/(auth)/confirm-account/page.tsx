import React, { Suspense } from "react";
import { ComfirmAccount } from "~/components/shared/auth";

const Page = () => {
  return (
    <Suspense>
      <ComfirmAccount />
    </Suspense>
  );
};

export default Page;
