import CabinTable from "./CabinTable";
import Heading from "../../_components/Heading";
import CabinTableOperations from "./CabinTableOperations";
import { getAllCabins } from "@/app/_lib/cabinActions";
import { Metadata } from "next";
import LayoutRow from "@/app/_components/LayoutRow";

export const metadata: Metadata = {
  title: "Cabins",

  icons: {
    icon: "/favicon.png",
  },
  description:
    "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page to configure cabins.",
  keywords: [
    "frontend",
    "giorgi gamgebeli",
    "react",
    "nextjs",
    "the wild oasis cabins page",
    "the wild oasis admin",
    "the wild oasis admin side",
    "the wild oasis admin side cabins page",
  ],
  openGraph: {
    title: "Cabins",
    images: [
      {
        url: "/cabins.png",
        alt: "The Wild Oasis Admin Dashboard",
      },
    ],
    description:
      "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page to configure cabins.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/cabins`,
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
      "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page to configure cabins.",
    images: ["/cabins.png"],
  },
};

async function Page() {
  const cabins = await getAllCabins();

  return (
    <>
      <LayoutRow>
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </LayoutRow>

      <CabinTable cabins={cabins} />
    </>
  );
}

export default Page;
