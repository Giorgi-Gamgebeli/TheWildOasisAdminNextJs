import DashboardFilter from "./DashboardFilter";
import DashboardLayout from "./DashboardLayout";
import Heading from "../../_components/Heading";
import Row from "../../_components/Row";
import { getAllReservations, getAllStays } from "@/app/_lib/reservationActions";
import { getAllCabins } from "@/app/_lib/cabinActions";
import TodayActivity from "./TodayActivity";
import { Metadata } from "next";

export const revalidate = 6 * 60 * 60;

export const metadata: Metadata = {
  title: "Dashboard",

  icons: {
    icon: "/app/icon.png",
  },
  description:
    "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page for dashboard.",
  keywords: [
    "frontend",
    "giorgi gamgebeli",
    "react",
    "nextjs",
    "the wild oasis dashboard page",
    "the wild oasis admin",
    "the wild oasis admin side",
    "the wild oasis admin side dashboard page",
  ],
  openGraph: {
    title: "Dashboard",
    images: [
      {
        url: "/dashboard.png",
        alt: "The Wild Oasis Admin Dashboard",
      },
    ],
    description:
      "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page for dashboard.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
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
    title: "The Wild Oasis admin side | Giorgi Gamgebeli",
    description:
      "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page for dashboard.",
    images: ["/dashboard.png"],
  },
};

async function Page() {
  const reservations = await getAllReservations();
  const cabins = await getAllCabins();
  const stays = await getAllStays();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout
        stays={stays}
        cabins={cabins}
        reservations={reservations}
      >
        <TodayActivity />
      </DashboardLayout>
    </>
  );
}

export default Page;
