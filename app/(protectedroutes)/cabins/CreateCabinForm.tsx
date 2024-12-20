"use client";

import Input from "../../_components/Input";
import Form from "../../_components/Form";
import Button from "../../_components/Button";
import FileInput from "../../_components/FileInput";
import Textarea from "../../_components/Textarea";
import FormRow from "../../_components/FormRow";

import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { Prisma } from "@prisma/client";
import { createCabin, updateCabin } from "@/app/_lib/cabinActions";

type CreateCabinFormProps = {
  cabinToEdit?: Partial<Prisma.CabinsGetPayload<object>>;
  onCloseModal?: () => void;
};

function CreateCabinForm({
  cabinToEdit = {},
  onCloseModal,
}: CreateCabinFormProps) {
  const {
    id: editId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
  } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const initialErrorState = {
    zodErrors: {
      name: undefined,
      maxCapacity: undefined,
      regularPrice: undefined,
      discount: undefined,
      description: undefined,
      image: undefined,
    },
  };

  const [errors, action] = useFormState(
    async (_: void | object, formData: FormData) => {
      let res;
      if (!isEditSession) res = await createCabin(formData);
      if (isEditSession) res = await updateCabin(formData);

      if (res?.zodErrors) return { zodErrors: res.zodErrors };

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      if (!isEditSession) toast.success("Cabin successfully created!");
      if (isEditSession) toast.success("Cabin successfully edited!");
      onCloseModal?.();
    },
    initialErrorState,
  );

  return (
    <Form action={action} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Cabin name" error={errors?.zodErrors?.name?.at(0)}>
        <Input
          type="text"
          id="name"
          defaultValue={isEditSession ? name : undefined}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors?.zodErrors?.maxCapacity?.at(0)}
      >
        <Input
          type="number"
          id="maxCapacity"
          defaultValue={isEditSession ? maxCapacity : undefined}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.zodErrors?.regularPrice?.at(0)}
      >
        <Input
          type="number"
          id="regularPrice"
          defaultValue={isEditSession ? regularPrice : undefined}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.zodErrors?.discount?.at(0)}>
        <Input
          type="number"
          id="discount"
          defaultValue={isEditSession ? discount : 0}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.zodErrors?.description?.at(0)}
      >
        <Textarea
          id="description"
          defaultValue={isEditSession ? description : ""}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.zodErrors?.image?.at(0)}>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <Input hidden id="cabinId" defaultValue={editId} />

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button>{isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
