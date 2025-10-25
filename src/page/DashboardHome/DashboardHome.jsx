import ServicePopularityChart from "../../component/Main/Dashboard/Barchart";
import IncomeGraphChart from "../../component/Main/Dashboard/IncomeGraphChart";
import UpcomingBooking from "../../component/Main/Dashboard/UpCommingBookings";

const DashboardHome = () => {
  return (
    <section className="w-full">
      <div className=" px-3 md:px-6 lg:px-8 pb-6">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold py-3">
          Dashboard Overview
        </h1>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 my-6">
          {/* Left: Income Graph */}
          <div className="col-span-1 rounded-lg p-1 md:p-2">
            {/* Give the chart a responsive, reliable height across breakpoints */}
            <div className="h-64 sm:h-72 md:h-[38vh] lg:h-[42vh] xl:h-[46vh]">
              <IncomeGraphChart />
            </div>
          </div>

          {/* Right: Service Popularity (Pie/Bar) */}
          <div className="col-span-1 rounded-lg p-1 md:p-2">
            <div className="h-64 sm:h-72 md:h-[38vh] lg:h-[42vh] xl:h-[46vh]">
              <ServicePopularityChart />
            </div>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="mt-4 md:mt-6">
          <UpcomingBooking />
        </div>
      </div>
    </section>
  );
};

export default DashboardHome;
