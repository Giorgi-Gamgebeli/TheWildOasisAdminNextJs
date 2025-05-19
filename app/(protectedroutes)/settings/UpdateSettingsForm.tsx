"use client";

import Form from "../../_components/Form";
import FormRow from "../../_components/FormRow";
import Input from "../../_components/Input";
import { Prisma } from "@prisma/client";
import { updateSettings } from "@/app/_lib/settingsActions";
import toast from "react-hot-toast";

type UpdateSettingsFormProps = {
  settings: Prisma.SettingsGetPayload<object>;
};

function UpdateSettingsForm({ settings }: UpdateSettingsFormProps) {
  const {
    minimumReservationLength,
    maxReservationLength,
    maxGuestsPerReservation,
    breakFastPrice,
  } = settings;

  async function handleBlur(
    value: number,
    field: keyof UpdateSettingsFormProps["settings"],
  ) {
    if (settings[field] === value) return;

    toast.success("Setting successfully updated!");

    const res = await updateSettings({ value, field });

    if (res?.error) return toast.error(res.error);
  }

  return (
    <Form>
      <FormRow label="Minimum nights/reservation">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minimumReservationLength}
          onBlur={(e) =>
            handleBlur(+e.target.value, "minimumReservationLength")
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === "Enter" && (e.target as HTMLInputElement).blur()
          }
        />
      </FormRow>
      <FormRow label="Maximum nights/reservation">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxReservationLength}
          onBlur={(e) => handleBlur(+e.target.value, "maxReservationLength")}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === "Enter" && (e.target as HTMLInputElement).blur()
          }
        />
      </FormRow>
      <FormRow label="Maximum guests/reservation">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerReservation}
          onBlur={(e) => handleBlur(+e.target.value, "maxGuestsPerReservation")}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === "Enter" && (e.target as HTMLInputElement).blur()
          }
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakFastPrice}
          onBlur={(e) => handleBlur(+e.target.value, "breakFastPrice")}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === "Enter" && (e.target as HTMLInputElement).blur()
          }
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
