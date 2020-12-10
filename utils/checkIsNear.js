const arePointsNear = (checkPoint, centerPoint, km) => {
  var ky = 40000 / 360;
  var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
};

export default arePointsNear;

var vasteras = { lat: 59.615911, lng: 16.544232 };
var stockholm = { lat: 59.345635, lng: 18.059707 };

var n = arePointsNear(vasteras, stockholm, 10);
