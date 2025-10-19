import ServicePopularityChart from "../../component/Main/Dashboard/Barchart";
import IncomeGraphChart from "../../component/Main/Dashboard/IncomeGraphChart";
import UpcomingBooking from "../../component/Main/Dashboard/UpCommingBookings";
const DashboardHome = () => {
  return (
    <section>
      <div className="px-3 pb-5">
        <h1 className="text-2xl font-semibold py-3 px-3">Dashboard Overview</h1>

        <div className="w-full h-full md:h-[40vh]  flex flex-col gap-4 md:flex-row justify-between items-center my-10">
          {/* Left Column: Chart */}
          <div className="w-full lg:w-[50%]  rounded-lg p-1">
            <IncomeGraphChart />
          </div>

          {/* Right Column: Pie Chart */}
          <div className="w-full lg:w-[40%]">
            <ServicePopularityChart />
          </div>
        </div>
        <UpcomingBooking />
      </div>
    </section>
  );
};

export default DashboardHome;
