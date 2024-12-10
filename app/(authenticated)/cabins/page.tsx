import CabinTable from "./CabinTable";
import Heading from "../../_components/Heading";
import Row from "../../_components/Row";
import AddCabin from "./AddCabin";
import CabinTableOperations from "./CabinTableOperations";

function Page() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />

        <AddCabin />
      </Row>
    </>
  );
}

export default Page;
