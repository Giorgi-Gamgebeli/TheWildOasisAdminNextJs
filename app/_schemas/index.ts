import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../_utils/constants";

export const PasswordConfirmSchema = z.string({
  message: "Only text is allowed",
});

export const UserIdSchema = z.string();

export const FileImageSchema = z
  .instanceof(File)
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 2MB`)
  .refine(
    (file) =>
      file?.size !== 0 ? ACCEPTED_IMAGE_TYPES.includes(file?.type) : true,
    "Only .jpg, .jpeg, .png and .webp formats are supported",
  );
