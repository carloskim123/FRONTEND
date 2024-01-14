import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import { Suspense,  useEffect, useState } from "react";
import Loader from "../components/navigation/Loader";

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
    },1000);

  })

  return (
    <>
        <Navbar/>
        
          <Suspense fallback={<Loader />}>
              {isLoading ? <Loader /> : <OutletComponent/> }
            </Suspense>
    </>
  )
}

export default Root;
