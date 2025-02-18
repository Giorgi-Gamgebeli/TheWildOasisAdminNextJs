import Heading from "../../_components/Heading";
import { getAllStays } from "@/app/_lib/reservationActions";
import { getCabinsLength } from "@/app/_lib/cabinActions";
import TodayActivity from "./TodayActivity";
import { Metadata } from "next";
import FilterOrSort from "@/app/_components/FilterOrSort";
import LayoutRow from "@/app/_components/LayoutRow";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Stats from "./Stats";
import { subDays } from "date-fns";
import { Prisma } from "@prisma/client";
import Empty from "@/app/_components/Empty";
import { getToday } from "@/app/_utils/helpers";

export const metadata: Metadata = {
  title: "Dashboard",

  icons: {
    icon: "/favicon.png",
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
    description:
      "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page for dashboard.",
    images: ["/dashboard.png"],
  },
};

export const revalidate = 0;

type Params = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

async function Page({ searchParams }: Params) {
  const [{ last }, cabinsLength, stays] = await Promise.all([
    searchParams,
    getCabinsLength(),
    getAllStays(),
  ]);

  if (!stays.length) return <Empty resourceName="data" />;

  const numDays = !last ? 7 : +last;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { reservationsAfterDate, confirmedStays } = stays.reduce<{
    reservationsAfterDate: Prisma.ReservationsGetPayload<object>[];
    confirmedStays: typeof stays;
  }>(
    (acc, stay) => {
      const { user: _, ...reservation } = stay;
      const reservationDate = new Date(reservation.createdAt);
      const stayDate = new Date(stay.startDate);

      if (
        reservationDate >= new Date(queryDate) &&
        reservationDate <= new Date(getToday({ end: true }))
      ) {
        acc.reservationsAfterDate = [...acc.reservationsAfterDate, reservation];
      }

      if (
        stayDate >= new Date(queryDate) &&
        stayDate <= new Date(getToday({ end: true })) &&
        stay.status !== "unconfirmed"
      ) {
        acc.confirmedStays = [...acc.confirmedStays, stay];
      }

      return acc;
    },
    {
      reservationsAfterDate: [],
      confirmedStays: [],
    }
  );

  return (
    <>
      <LayoutRow>
        <Heading as="h1">Dashboard</Heading>

        <FilterOrSort
          field="last"
          horizontalUntil={600}
          options={[
            { value: "7", label: "Last 7 days" },
            { value: "30", label: "Last 30 days" },
            { value: "90", label: "Last 90 days" },
          ]}
        />
      </LayoutRow>

      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-[2.4rem] text-gray-700 dark:text-gray-200">
        <Stats
          reservations={reservationsAfterDate}
          confirmedStays={confirmedStays}
          numDays={numDays}
          cabinCount={cabinsLength}
        />
        <TodayActivity />
        <DurationChart confirmedStays={confirmedStays} />
        <SalesChart reservations={reservationsAfterDate} numDays={numDays} />
      </div>
    </>
  );
}

export default Page;
