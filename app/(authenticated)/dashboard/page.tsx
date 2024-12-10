import DashboardFilter from "./DashboardFilter";
import DashboardLayout from "./DashboardLayout";
import Heading from "../../_components/Heading";
import Row from "../../_components/Row";

function Page() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Page;
