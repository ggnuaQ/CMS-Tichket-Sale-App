import { HomeDoughnutChart } from "../../components/homeDoughnutChart";
import HomeLineChart from "../../components/homeLineChart";

const Home = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Thống kê</h1>
      <HomeLineChart />
      <HomeDoughnutChart />
    </div>
  );
};

export default Home;
