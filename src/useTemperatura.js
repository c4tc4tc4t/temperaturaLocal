import axios from "axios";
import React from "react";
import useLatLong from "./useLatLong";

function useTemperatura() {
  const [temperatura, setTemperatura] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [latitudeLongitude] = useLatLong();
  const [mensagemDeErro, setMensagemDeErro] = React.useState("Carregando...");

  React.useEffect(() => {
    if (!latitudeLongitude.lat || !latitudeLongitude.long) return;
    axios
      .get(
        `https://api.tomorrow.io/v4/timelines?location=${latitudeLongitude.lat},${latitudeLongitude.long}&fields=temperature&timesteps=current&units=metric&apikey=${process.env.REACT_APP_NOT_SECRET_CODE}&timezone=Brazil/East`
      )
      .then((response) => {
        return response;
      })
      .then((Data) => {
        setTemperatura(
          Math.round(
            +Data.data.data.timelines[0].intervals[0].values.temperature
          ).toString()
        );
        setLoading(true);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setMensagemDeErro("A chave da API do tomorrow.io está incorreta");
        }
      });
  }, [latitudeLongitude.lat, latitudeLongitude.long]);

  React.useEffect(() => {
    if (!loading) {
      setTemperatura(mensagemDeErro);
    }
  }, [loading, mensagemDeErro]);

  return [temperatura];
}

export default useTemperatura;
