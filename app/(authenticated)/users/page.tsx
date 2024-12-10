import Heading from "../../_components/Heading";
import SignupForm from "../../_authentication/SignupForm";

function Page() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </>
  );
}

export default Page;
