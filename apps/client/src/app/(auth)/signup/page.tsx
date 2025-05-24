import { Suspense } from "react";
import { SignUp } from "~/components/shared/auth";

const Page = () => {
  return (
    <Suspense>
      <SignUp />
    </Suspense>
  );
};

export default Page;
