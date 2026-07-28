export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation)
      return reject("Geolocation not supported");

    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      () => reject("Location permission denied")
    );
  });
};
