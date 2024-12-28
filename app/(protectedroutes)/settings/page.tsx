import UpdateSettingsForm from "./UpdateSettingsForm";
import Heading from "../../_components/Heading";
import Row from "../../_components/Row";
import { getSettings } from "@/app/_lib/settingsActions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change settings",

  icons: {
    icon: "/favicon.png",
  },
  description:
    "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page for changing settings",
  keywords: [
    "frontend",
    "giorgi gamgebeli",
    "react",
    "nextjs",
    "the wild oasis settings page",
    "the wild oasis admin",
    "the wild oasis admin side",
    "the wild oasis admin side settings page",
  ],
  openGraph: {
    title: "Change settings",

    images: [
      {
        url: "/settings.png",
        alt: "The Wild Oasis Admin Dashboard",
      },
    ],
    description:
      "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page for changing settings.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/settings`,
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
      "Web application tailored for hotel staff to track customer payments and manage guest stays. Packed with advanced features. Page for changing settings.",
    images: ["/settings.png"],
  },
};

async function Page() {
  const settings = await getSettings();

  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm settings={settings} />
    </Row>
  );
}

export default Page;
