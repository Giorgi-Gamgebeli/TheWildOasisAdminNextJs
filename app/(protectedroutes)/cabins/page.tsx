import CabinTable from "./CabinTable";
import Heading from "../../_components/Heading";
import Row from "../../_components/Row";
import AddCabin from "./AddCabin";
import CabinTableOperations from "./CabinTableOperations";
import { getAllCabins } from "@/app/_lib/cabinActions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cabins",

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
    description:
      "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page to configure cabins.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/cabins`,
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
