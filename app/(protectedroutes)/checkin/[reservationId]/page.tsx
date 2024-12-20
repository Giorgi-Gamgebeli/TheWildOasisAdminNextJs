import { getSettings } from "@/app/_lib/settingsActions";

import { getReservation } from "@/app/_lib/reservationActions";
import CheckinReservation from "./CheckinReservation";

type Params = {
  reservationId: string;
};

async function Page({ params }: { params: Params }) {
  const settings = await getSettings();
  const reservation = await getReservation(+params.reservationId);

  return <CheckinReservation settings={settings} reservation={reservation} />;
}

export default Page;
