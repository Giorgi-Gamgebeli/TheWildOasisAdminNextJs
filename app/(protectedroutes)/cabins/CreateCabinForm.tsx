"use client";

import Input from "../../_components/Input";
import Form from "../../_components/Form";
import Button from "../../_components/Button";
import FileInput from "../../_components/FileInput";
import Textarea from "../../_components/Textarea";
import FormRow from "../../_components/FormRow";

import toast from "react-hot-toast";
import { Prisma } from "@prisma/client";
import { createCabin } from "@/app/_lib/cabinActions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCabinSchemaClient } from "@/app/_schemas/cabinSchemas";
import { useState, useTransition } from "react";

type CreateCabinFormProps = {
  onCloseModal?: () => void;
  handleCreate: (cabin: Prisma.CabinsGetPayload<object>) => void;
};

function CreateCabinForm({ onCloseModal, handleCreate }: CreateCabinFormProps) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<z.infer<typeof CreateCabinSchemaClient>>({
    resolver: zodResolver(CreateCabinSchemaClient),
    defaultValues: {
      name: "",
      maxCapacity: 0,
      regularPrice: 0,
      discount: 0,
      description: "",
    },
  });

  const [, startTransition] = useTransition();

  const [image, setImage] = useState<File>(new File([], ""));

  async function onSubmit(values: z.infer<typeof CreateCabinSchemaClient>) {
    toast.success("Cabin successfully created!");
    reset();
    onCloseModal?.();

    startTransition(async () => {
      handleCreate({
        ...values,
        id: Math.random(),
        image: "",
        createdAt: new Date(),
      });

      const formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        if (value instanceof FileList) formData.append(key, image);
        formData.append(key, value.toString());
      }

      const res = await createCabin(formData);

      // if (res?.error) {
      //   toast.error(res.error);
      //   console.error(res.error);
      // }
      if (res?.error) {
        const errorMessage =
          typeof res.error === "string" ? res.error : "Unknown error occured";
        toast.error(errorMessage);
        console.error(errorMessage);
      }
    });
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" register={register} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" register={register} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" register={register} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" register={register} />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea id="description" register={register} />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          register={register}
          onChange={(e) => setImage(e?.target?.files?.[0] || new File([], ""))}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          ariaLabel="Cancel"
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button ariaLabel="Create cabin">Create new cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
