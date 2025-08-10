import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function Verify() {
  const navigate=useNavigate()
  const location = useLocation();
  console.log(location.state)
  const [email] = useState(location.state)

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
},[email])
     return (
       <div className="container mx-auto px-4 text-justify">
         <h1>
           This is a verify page
         </h1>
       </div>
     );
}
