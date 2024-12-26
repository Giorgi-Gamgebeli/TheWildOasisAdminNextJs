import { MetadataRoute } from "next";
import { getAllReservations } from "./_lib/reservationActions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const reservations = await getAllReservations();

  const urlsForReservations: MetadataRoute.Sitemap = reservations.map(
    (reservation) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/reservations/${reservation.id}`,
      // lastModified,:
    }),
  );

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
    },
    ...urlsForReservations,
  ];
}
