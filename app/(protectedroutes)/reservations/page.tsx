import { getAllReservationsWithCount } from "@/app/_lib/reservationActions";
import Heading from "../../_components/Heading";
import Row from "../../_components/Row";
import ReservationTable from "./ReservationTable";
import ReservationTableOperations from "./ReservationTableOperations";
import { Metadata } from "next";

export const revalidate = 6 * 60 * 60;

export const metadata: Metadata = {
  title: "Reservations",

  description:
    "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page to check new reservations.",
  keywords: [
    "frontend",
    "giorgi gamgebeli",
    "react",
    "nextjs",
    "the wild oasis reservation page",
    "the wild oasis admin",
    "the wild oasis admin side",
    "the wild oasis admin side reservation page",
  ],
  openGraph: {
    title: "Reservations",
    description:
      "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page to check new reservations.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/reservations`,
    siteName: "The Wild Oasis admin side | Giorgi Gamgebeli",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      "max-image-preview": "large",
    },
  },
  category: "web development",
  twitter: {
    card: "summary_large_image",
  },
};

async function Page() {
  const { reservations, count } = await getAllReservationsWithCount();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All reservations</Heading>
        <ReservationTableOperations />
      </Row>

      <ReservationTable reservations={reservations} count={count} />
    </>
  );
}

export default Page;
