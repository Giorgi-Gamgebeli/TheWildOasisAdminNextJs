"use client";

import Button from "../_components/Button";
import Form from "../_components/Form";
import Input from "../_components/Input";
import FormRowVertical from "../_components/FormRowVertical";
import SpinnerMini from "../_components/SpinnerMini";
import { login } from "../_lib/actions";
import toast from "react-hot-toast";

function LoginForm() {
  async function clientAction(formData: FormData) {
    const res = await login(formData);

    if (res?.error) return toast.error(res.error);

    // To redirect user to dashboard with middleware after they are logged in, otherwise session is null until refresh
    window.location.reload();
  }

  return (
    <Form action={clientAction}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          defaultValue="adminaccount@gmail.com"
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          defaultValue="12345678"
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" pendingStatus={<SpinnerMini />}>
          Login in
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
