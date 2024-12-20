import HeaderMenu from "./HeaderMenu";
import UserAvatar from "./UserAvatar";

function Header() {
  return (
    <header className="gap--[2.4rem] flex items-center justify-end border-b border-gray-100 bg-[#fff] px-[4.8rem] py-[1.2rem] dark:border-gray-800 dark:bg-gray-0">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}

export default Header;
