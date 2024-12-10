import Tag from "../../_components/Tag";
import { Flag } from "../../_components/Flag";
import Button from "../../_components/Button";
import CheckoutButton from "./CheckoutButton";
import Link from "next/link";

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <li className="grid grid-cols-[9rem_2rem_1fr_auto_9rem] items-center gap-[1.2rem] border-b border-gray-100 px-0 py-[0.8rem] text-[1.4rem] first:border-t dark:border-gray-800">
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />

      <div className="font-medium">{guests.fullName}</div>
      <div>{numNights}</div>

      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          href={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && (
        <CheckoutButton bookingId={id}>Departing</CheckoutButton>
      )}
    </li>
  );
}

export default TodayItem;
