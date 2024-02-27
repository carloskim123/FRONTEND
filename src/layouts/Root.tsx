import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import { Suspense, useEffect, useState } from "react";
import Loader from "../components/navigation/Loader";
import Footer from "../components/navigation/Footer";
import ScrollToTop from "../helpers/ScrollToTop";


const OutletComponent = () => {
  return (
    <div className="mt-24">
      <Outlet />
    </div>
  )
}

function Root() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {

      setIsLoading(false);
    }, 2000);


  })


  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>
        {isLoading ? <Loader /> : <OutletComponent />}
      </Suspense>
        
      <Footer />
    </>
  )
}

export default Root;
