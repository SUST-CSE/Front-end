import Header from "../components/Header/Header";
import Courses from "../components/Courses/Courses";
import Facilities from "../components/Facilities/Facilities";
import Cta from "../components/Cta/Cta";
import Footer from "../components/Footer/Footer";
import Dashboard from "../components/Dashboard/Dashboard";

const Home = () => {
  return (
    <>
      <Header />
      <Dashboard />
      <Courses />
      <Facilities />
      <Cta />
      <Footer />
    </>
  );
};

export default Home;
