import UpdateSettingsForm from "./UpdateSettingsForm";
import Heading from "../../_components/Heading";
import Row from "../../_components/Row";

function Page() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Page;
