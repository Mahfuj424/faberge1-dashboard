import ServicePopularityChart from "../../component/Main/Dashboard/Barchart";
import IncomeGraphChart from "../../component/Main/Dashboard/IncomeGraphChart";
import UpcomingBooking from "../../component/Main/Dashboard/UpCommingBookings";

const DashboardHome = () => {
  return (
    <section className="w-full">
      <div className=" px-3 pb-6">
        <h1 className="text-xl font-semibold text-gray-800 pt-5">
          Dashboard Overview
        </h1>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 my-6">
          {/* Left: Income Graph */}
          <div className="col-span-1 rounded-lg p-1 md:p-2">
            {/* Give the chart a responsive, reliable height across breakpoints */}
            <div className="h-full overflow-x-auto md:w-[400px] lg:w-[650px] xl:w-full">
              <IncomeGraphChart />
            </div>
          </div>

          {/* Right: Service Popularity (Pie/Bar) */}
          <div className="col-span-1 rounded-lg p-1 md:p-2">
            <div className="h-full overflow-x-auto md:w-[400px] lg:w-[650px] xl:w-full">
              <ServicePopularityChart />
            </div>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="mt-4 md:mt-6 mx-2 overflow-x-auto md:w-[400px] lg:w-[650px] xl:w-full">
          <UpcomingBooking />
        </div>
      </div>
    </section>
  );
};

export default DashboardHome;
