import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../_data/Uploader";

function Sidebar() {
  return (
    <aside className="row-start-1 -row-end-1 flex flex-col gap-[1rem] border-r border-gray-100 bg-white px-[2.4rem] py-[3.2rem] text-gray-0 dark:border-gray-800 dark:bg-gray-0">
      <Logo />
      <MainNav />

      <Uploader />
    </aside>
  );
}

export default Sidebar;
