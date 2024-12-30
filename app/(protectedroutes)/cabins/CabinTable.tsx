"use client";

import Spinner from "../../_components/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../_components/Table";
import Menus from "../../_components/Menus";
import Empty from "../../_components/Empty";
// import { useSearchParams } from "next/navigation";
import { Prisma } from "@prisma/client";
import { useMemo, useOptimistic, useTransition } from "react";
import { duplicateCabin } from "@/app/_lib/cabinActions";
import toast from "react-hot-toast";

function CabinTable({ cabins }: { cabins: Prisma.CabinsGetPayload<object>[] }) {
  // const searchParams = useSearchParams();

  // 1) FILTER
  // const filterValue = searchParams.get("discount") || "all";

  // let filteredCabins = cabins;
  // if (filterValue === "no-discount")
  //   filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  // if (filterValue === "with-discount")
  //   filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);

  // 2) SORT
  // const sortBy = searchParams.get("sortBy") || "startDate-asc";
  // const [field, direction] = sortBy.split("-");
  // const modifier = direction === "asc" ? 1 : -1;
  // const sortedCabins = filteredCabins?.sort(
  //   // @ts-expect-error: Couldn't fix error, type is first undefined then number, but it reads as any
  //   (a, b) => (a[field] - b[field]) * modifier,
  // );
  const [, startTransition] = useTransition();

  const [optimisticCabins, setOptimisticCabins] = useOptimistic(
    useMemo(() => {
      return cabins;
    }, [cabins]),
    (prevState, cabin: Prisma.CabinsGetPayload<object>) => [
      ...prevState,
      cabin,
    ],
  );

  function handleDuplicate(cabin: Prisma.CabinsGetPayload<object>) {
    toast.success("Cabin successfully duplicated!");

    startTransition(async () => {
      setOptimisticCabins({ ...cabin, name: `Copy of ${cabin.name}` });

      const res = await duplicateCabin(cabin.id);

      if (res?.error) toast.error(res.error);
    });
  }

  if (!cabins) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={optimisticCabins}
          render={(cabin) => (
            <CabinRow
              handleDuplicate={handleDuplicate}
              cabin={cabin}
              key={cabin.name}
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
