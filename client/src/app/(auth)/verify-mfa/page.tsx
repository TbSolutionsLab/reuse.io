import { Suspense } from "react";
import { VerifyMfa } from "~/components/shared/auth";


const Page = () => {
  return (
    <Suspense>
      <VerifyMfa />;
    </Suspense>
  );
};

export default Page;
