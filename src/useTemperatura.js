import React from "react";
import useLatLong from "./useLatLong";

function useTemperatura() {
  const [temperatura, setTemperatura] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [latitudeLongitude] = useLatLong();

  React.useEffect(() => {
    if (!latitudeLongitude.lat || !latitudeLongitude.long) return;
    fetch(
      `https://api.tomorrow.io/v4/timelines?location=${latitudeLongitude.lat},${latitudeLongitude.long}&fields=temperature&timesteps=current&units=metric&apikey=s8e35wIp8DoWrNUqaboPgmEkDbjFEM9u&timezone=Brazil/East`
    )
      .then((response) => response.json())
      .then((jsonData) => {
        setTemperatura(
          Math.round(
            +jsonData.data.timelines[0].intervals[0].values.temperature
          ).toString() + "°C"
        );
        setLoading(true);
      });
    if (!loading) {
      setTemperatura("Carregando...");
    }
  }, [latitudeLongitude.lat, latitudeLongitude.long, loading]);

  return [temperatura];
}

export default useTemperatura;
