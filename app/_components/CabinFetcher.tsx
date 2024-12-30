import CabinTable from "../(protectedroutes)/cabins/CabinTable";
import { getAllCabins } from "../_lib/cabinActions";

async function CabinFetcher() {
  const cabins = await getAllCabins();

  return <CabinTable cabins={cabins} />;
}

export default CabinFetcher;
