import React from "react";
import useLatLong from "./useLatLong";

function CEP() {
  const [cidade, setCidade] = React.useState("");
  const [estado, setEstado] = React.useState("");
  const [pais, setPais] = React.useState("");
  const [latitudeLongitude] = useLatLong();

  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitudeLongitude.lat},${latitudeLongitude.long}&sensor=true&key=AIzaSyDLK09wJhYtifedTLd6WO4bu8NI0lo7URA`
  )
    .then((response) => response.json())
    .then((jsonData) => {
      setCidade(jsonData.results[0].address_components[3].long_name);
      setEstado(jsonData.results[0].address_components[4].long_name);
      setPais(jsonData.results[0].address_components[5].long_name);
    });

  return (
    <div className="cep">
      {cidade},{estado},{pais}
    </div>
  );
}

export default CEP;
