import CabinTable from "./CabinTable";
import Heading from "../../_components/Heading";
import Row from "../../_components/Row";
import AddCabin from "./AddCabin";
import CabinTableOperations from "./CabinTableOperations";
import { getAllCabins } from "@/app/_lib/cabinActions";

async function Page() {
  const cabins = await getAllCabins();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable cabins={cabins} />

        <AddCabin />
      </Row>
    </>
  );
}

export default Page;
