import UpdateSettingsForm from "./UpdateSettingsForm";
import Heading from "../../_components/Heading";
import Row from "../../_components/Row";
import { getSettings } from "@/app/_lib/settingsActions";

async function Page() {
  const settings = await getSettings();

  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm settings={settings} />
    </Row>
  );
}

export default Page;
