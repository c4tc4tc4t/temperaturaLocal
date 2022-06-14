import React from "react";
import "./Main.css";
import CEP from "./CEP";
import LuaSol from "./LuaSol";
import dia from "./imgs/dia.png";
import noite from "./imgs/noite.jpg";
import useTemperatura from "./useTemperatura";
import { getHours } from "date-fns";
import Data from "./Data.js";
import MsgDay from "./MsgDay";

function Main() {
  const [temperatura] = useTemperatura();
  const [diaNoite, setDiaNoite] = React.useState();

  React.useEffect(() => {
    setDiaNoite(() => {
      if (getHours(new Date()) >= 6 && getHours(new Date()) < 18) {
        return dia;
      } else {
        return noite;
      }
    });
  }, []);

  return (
    <div className="img" style={{ backgroundImage: `url(${diaNoite})` }}>
      <div className="container">
        <CEP />
        <Data />
      </div>
      <div className="centro">
        {temperatura === "Carregando..." ? (
          <div className="carregando">{temperatura}</div>
        ) : (
          <>
            <div className="temperatura">{temperatura} °C</div>
            <LuaSol />
          </>
        )}
      </div>
      <MsgDay />
    </div>
  );
}

export default Main;
