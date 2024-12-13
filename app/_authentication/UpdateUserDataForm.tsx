"use client";

import Button from "../_components/Button";
import FileInput from "../_components/FileInput";
import Form from "../_components/Form";
import FormRow from "../_components/FormRow";
import Input from "../_components/Input";

import { useFormState } from "react-dom";
import { updateUser } from "../_lib/databaseActions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Spinner from "../_components/Spinner";

function UpdateUserDataForm() {
  const initialErrorState = {
    zodErrors: {
      password: undefined,
      passwordConfirm: undefined,
    },
  };

  const [errors, action] = useFormState(
    async (_: void | object, formData: FormData) => {
      const res = await updateUser(formData);

      if (res?.zodErrors) return { zodErrors: res.zodErrors };

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Account successfully updated!");
    },
    initialErrorState,
  );

  const session = useSession();

  if (!session.data) return <Spinner />;

  return (
    <Form action={action}>
      <FormRow label="Email address">
        <Input defaultValue={session.data?.user.email} disabled />
      </FormRow>
      <FormRow label="Full name" error={errors?.zodErrors?.fullName?.at(0)}>
        <Input
          type="text"
          defaultValue={session.data?.user.name}
          id="fullName"
        />
      </FormRow>
      <FormRow
        label="New password (min 8 chars)"
        error={errors?.zodErrors?.password?.at(0)}
      >
        <Input type="password" id="password" autoComplete="current-password" />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.zodErrors?.passwordConfirm?.at(0)}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput id="avatar" accept="image/*" />
      </FormRow>
      <Input hidden id="userId" defaultValue={session.data.user.id} />
      <FormRow>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
