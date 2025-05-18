import React, { Suspense } from "react";
import { ResetPassword } from "~/components/shared/auth";


const Page = () => {
  return (
    <Suspense>
      <ResetPassword />;
    </Suspense>
  );
};

export default Page;
