import axios from "axios";
import React from "react";
import useLatLong from "./useLatLong";

function useTemperatura() {
  const [temperatura, setTemperatura] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [latitudeLongitude] = useLatLong();

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
        console.log(Data.headers[0]);
        setTemperatura(
          Math.round(
            +Data.data.data.timelines[0].intervals[0].values.temperature
          ).toString()
        );
        setLoading(true);
      });
  }, [latitudeLongitude.lat, latitudeLongitude.long]);

  React.useEffect(() => {
    if (!loading) {
      setTemperatura("Carregando...");
    }
  }, [loading]);

  return [temperatura];
}

export default useTemperatura;
