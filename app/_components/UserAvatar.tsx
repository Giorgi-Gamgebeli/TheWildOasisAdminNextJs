import Image from "next/image";
import defaultAvatar from "@/public/default-user.jpg";
import { auth } from "@/auth";

async function UserAvatar() {
  const session = await auth();

  return (
    <div className="flex items-center gap-[1.2rem] pr-6 text-[1.4rem] font-medium">
      <Image
        className="block aspect-square w-[3.6rem] rounded-[50%] object-cover object-center outline-2 outline-[var(--color-grey-100)]"
        src={session?.user.image || defaultAvatar}
        alt={`Avatar of person`}
        width={36}
        height={36}
      />
      <span>{session?.user.name}</span>
    </div>
  );
}

export default UserAvatar;
