import React from "react";

function useLatLong() {
  const [latLong, setLatLong] = React.useState({ lat: "", long: "" });

  const getLocation = React.useCallback(function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }, []);

  function showPosition(position) {
    setLatLong(() => {
      return { lat: position.coords.latitude, long: position.coords.longitude };
    });
  }
  React.useEffect(() => {
    getLocation();
  }, [getLocation]);
  return [latLong];
}

export default useLatLong;
