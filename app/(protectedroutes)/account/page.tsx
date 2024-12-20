import Heading from "../../_components/Heading";
import Row from "../../_components/Row";
import UpdateUserDateForm from "../../_components/UpdateUserDataForm";

function Page() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <UpdateUserDateForm />
      </Row>
    </>
  );
}

export default Page;
