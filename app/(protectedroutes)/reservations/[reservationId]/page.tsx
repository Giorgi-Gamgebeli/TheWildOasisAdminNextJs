import {
  getAllReservations,
  getReservation,
} from "@/app/_lib/reservationActions";
import ReservationDetail from "./ReservationDetail";
import { Metadata } from "next";

type Params = {
  params: Promise<{
    reservationId: string;
  }>;
};

export async function generateStaticParams() {
  const reservations = await getAllReservations();

  const ids =
    reservations?.map((reservation) => ({
      reservationId: String(reservation.id),
    })) || [];

  return ids;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { reservationId } = await params;

  const reservation = await getReservation(+reservationId);

  return {
    title: `Reservation ${reservationId}`,
    icons: {
      icon: "/favicon.png",
    },
    description: `Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. ${reservation?.user.name}'s reservation in cabin ${reservation?.cabin.name}`,

    openGraph: {
      title: `Reservation ${reservationId}`,
      description: `Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. ${reservation?.user.name}'s reservation in cabin ${reservation?.cabin.name}`,
      images: [
        {
          url: "/reservations.png",
          alt: "The Wild Oasis Admin Dashboard",
        },
      ],
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/reservations/${reservation?.id}`,
      siteName: "The Wild Oasis admin side | Giorgi Gamgebeli",
      locale: "en-US",
      type: "website",
    },
    robots: {
      index: false,
      follow: true,
      nocache: false,
      googleBot: {
        index: false,
        "max-image-preview": "large",
      },
    },
    category: "web development",
    twitter: {
      card: "summary_large_image",
      title: "The Wild Oasis admin side | Giorgi Gamgebeli",
      description: `Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. ${reservation?.user.name}'s reservation in cabin ${reservation?.cabin.name}`,
      images: ["/reservations.png"],
    },
  };
}

async function Page({ params }: Params) {
  const { reservationId } = await params;

  const reservation = await getReservation(+reservationId);

  return <ReservationDetail reservation={reservation} />;
}

export default Page;
