import { useEffect, useState } from "react";

function AlertComponent({error}) {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);
  if (!visible) return null;
  return (
    <div className="md:w-[300px] py-8 px-4 rounded-lg h-[40px] w-[80%] text-red-600 border border-[rgba(255,255,255,0.25)] absolute bottom-0 md:bottom-10 md:right-10  flex justify-center flex-col">
      <p>{error.error}</p>
    </div>
  );
}

export default AlertComponent;
