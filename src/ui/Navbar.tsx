import { Bell, Search } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex w-full items-center justify-between bg-white border-b-2 border-[#E4E4E7] px-5 py-5">
      <div className="relative w-full max-w-[763.5px]">
        <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 pointer-events-none" />

        <input
          type="text"
          placeholder="Type to search"
          className="h-[45.24px] w-full rounded-[11.31px] border border-[#E4E4E7] pl-10 pr-4 outline-none transition-colors focus:border-gray-400"
        />
      </div>

      <div className="flex items-center gap-[17px]">
        <Bell
          color="#707070"
          width={30.18}
          height={30.3}
          className="cursor-pointer"
        />

        <img
          src="user.jpg"
          className="h-[43px] w-[43px] cursor-pointer rounded-full object-cover"
          alt="User profile"
        />
      </div>
    </div>
  );
};

export default Navbar;
