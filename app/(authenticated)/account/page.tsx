import Heading from "../../_components/Heading";
import Row from "../../_components/Row";
import UpdateUserDateForm from "../../_authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../../_authentication/UpdatePasswordForm";

function Page() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDateForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Page;
