import React from "react";
import useLatLong from "./useLatLong";

function useTemperatura() {
  const [temperatura, setTemperatura] = React.useState(0);
  const [latitudeLongitude] = useLatLong();
  React.useEffect(() => {
    fetch(
      `https://api.tomorrow.io/v4/timelines?location=${latitudeLongitude.lat},${latitudeLongitude.long}&fields=temperature&timesteps=current&units=metric&apikey=s8e35wIp8DoWrNUqaboPgmEkDbjFEM9u&timezone=Brazil/East`
    )
      .then((response) => response.json())
      .then((jsonData) => {
        setTemperatura(
          Math.round(
            +jsonData.data.timelines[0].intervals[0].values.temperature
          ).toString()
        );
      });
  }, [latitudeLongitude.lat, latitudeLongitude.long]);
  return [temperatura];
}

export default useTemperatura;
