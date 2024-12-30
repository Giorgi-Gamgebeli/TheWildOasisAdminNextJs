import LoginForm from "./_components/LoginForm";
import Logo from "./_components/Logo";
import Heading from "./_components/Heading";

function Page() {
  return (
    <main className="h-screen w-full overflow-auto bg-gray-100 pt-20 text-gray-700 backdrop-blur-lg dark:bg-gray-900 dark:text-gray-200">
      <div className="mx-auto my-0 flex w-[50rem] flex-col">
        <Logo />
        <Heading as="h4" className="mb-14">
          Log in to your account
        </Heading>
        <LoginForm />
      </div>
    </main>
  );
}

export default Page;
