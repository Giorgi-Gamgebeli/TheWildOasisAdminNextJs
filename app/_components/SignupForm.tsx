"use client";

import Button from "../_components/Button";
import Form from "../_components/Form";
import FormRow from "../_components/FormRow";
import Input from "../_components/Input";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { signup } from "../_lib/authActions";

function SignupForm() {
  const initialErrorState = {
    zodErrors: {
      email: undefined,
      fullName: undefined,
      password: undefined,
      passwordConfirm: undefined,
    },
  };

  const [errors, action] = useFormState(
    async (_: void | object, formData: FormData) => {
      const res = await signup(formData);

      if (res?.zodErrors) {
        return { zodErrors: res.zodErrors };
      }

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Account created succesfully");
    },
    initialErrorState,
  );

  return (
    <Form action={action}>
      <FormRow label="Full name" error={errors?.zodErrors?.fullName?.at(0)}>
        <Input type="text" id="fullName" />
      </FormRow>

      <FormRow label="Email address" error={errors?.zodErrors?.email?.at(0)}>
        <Input type="email" id="email" />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.zodErrors?.password?.at(0)}
      >
        <Input type="password" id="password" />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={errors?.zodErrors?.passwordConfirm?.at(0)}
      >
        <Input type="password" id="passwordConfirm" />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
