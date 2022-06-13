import { getHours } from "date-fns";
import React from "react";
import useTemperatura from "./useTemperatura";

function MsgDay() {
  const [msg, setMsg] = React.useState("");
  const [temperatura] = useTemperatura();

  React.useEffect(() => {
    if (!temperatura) return;
    setMsg(() => {
      if (temperatura <= 0) {
        return "CUIDADO, Frio congelante. Se aqueça o maximo possivel";
      } else if (temperatura > 0 && temperatura <= 10) {
        return "Que frioooo, um bom dia para ficar de baixo das cobertas";
      } else if (temperatura > 10 && temperatura <= 18) {
        return "Friozinho de leve não mata ninguem";
      } else if (temperatura > 18 && temperatura <= 24) {
        return "Clima agradável, bora pra rua";
      } else if (temperatura > 24) {
        return "Que calooooooor, cuidado para não se desidratatar";
      }
    });
  }, [temperatura, msg]);

  return (
    <div
      className="msg"
      style={
        getHours(new Date()) >= 6 && getHours(new Date()) < 18
          ? { color: "#4B0082" }
          : { color: "#b0e0e6" }
      }
    >
      {msg}
    </div>
  );
}

export default MsgDay;
