const arePointsNear = (checkPoint, centerPoint, km) => {
  const ky = 40000 / 360;
  const kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
  const dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  const dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
};

export default arePointsNear;

const vasteras = { lat: 59.615911, lng: 16.544232 };
const stockholm = { lat: 59.345635, lng: 18.059707 };

const n = arePointsNear(vasteras, stockholm, 10);
