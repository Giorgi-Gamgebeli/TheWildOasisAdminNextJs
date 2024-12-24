import { z } from "zod";
import { ReservationsSchemaDatabase } from "./databaseSchemas";

export const UpdateCheckinSchema = z.object({
  id: ReservationsSchemaDatabase.shape.id,
  hasBreakfast: ReservationsSchemaDatabase.shape.hasBreakfast.optional(),
  extrasPrice: ReservationsSchemaDatabase.shape.extrasPrice.optional(),
  totalPrice: ReservationsSchemaDatabase.shape.totalPrice.optional(),
});

export const ReservationWithoutId = ReservationsSchemaDatabase.omit({
  id: true,
});
