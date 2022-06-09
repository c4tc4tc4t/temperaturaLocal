import { format } from "date-fns";
import React from "react";

function Data() {
  const [data, setdata] = React.useState("");

  React.useEffect(() => {
    setdata(format(new Date(), "dd-MM-yyyy' 'HH:mm:ss "));
  }, []);
  return <div className="dataHora">{data}</div>;
}

export default Data;
