function DashboardBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[2.4rem] rounded-md border border-gray-100 bg-gray-0 p-[3.2rem] dark:border-gray-800 dark:bg-white">
      {children}
    </div>
  );
}

export default DashboardBox;
