import CardFour from '../Dashboard/CardFour.jsx';
import CardOne from '../Dashboard/CardOne.jsx';
import CardThree from '../Dashboard/CardThree.jsx';
import CardTwo from '../Dashboard/CardTwo.jsx';
import ChartOne from '../Dashboard/ChartOne.jsx';
import ChartThree from '../Dashboard/ChartThree.jsx';
import TopNews from '../Dashboard/TopNews.jsx';


const AdminDashboardLayout = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
        
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-7">
          <TopNews />
        </div>
        <div className="col-span-12 md:col-span-6 xl:col-span-5">
          <ChartThree />
        </div>
        <div className="col-span-12">
          <ChartOne />
        </div>
      </div>

    </>
  );
};

export default AdminDashboardLayout;
