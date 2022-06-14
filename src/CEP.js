import React from "react";
import useLatLong from "./useLatLong";

function CEP() {
  const [ceps, setCeps] = React.useState({});
  const [latitudeLongitude] = useLatLong();

  const endereco = React.useCallback(() => {
    if (!latitudeLongitude.lat || !latitudeLongitude.long) return;
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitudeLongitude.lat},${latitudeLongitude.long}&sensor=true&key=AIzaSyDLK09wJhYtifedTLd6WO4bu8NI0lo7URA`
    )
      .then((response) => response.json())
      .then((jsonData) => {
        setCeps({
          cidade: jsonData.results[0].address_components[3].long_name,
          estado: jsonData.results[0].address_components[4].long_name,
          pais: jsonData.results[0].address_components[5].long_name,
        });
      });
  }, [latitudeLongitude.lat, latitudeLongitude.long]);

  React.useEffect(() => {
    endereco();
  }, [endereco]);

  return (
    <div className="cep">
      {ceps.cidade}, {ceps.estado}, {ceps.pais}
    </div>
  );
}

export default CEP;
