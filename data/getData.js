const request = require("request");
const fs = require("fs");
const TLEJS = require("tle.js");
const tlejs = new TLEJS();

const inputURL =
  "https://github.com/WorldWindLabs/SpaceBirds/raw/master/Backend_nodejs_stuff/TLE.json";
const outputFilePath = "./src/data/full.json";

const incMin = -2; // Minimum Inclination (orbit angle from equator)
const incMax = 2; // Maximum Inclination (orbit angle from equator)

const minimumCoordinates = 0; // Minimum altitude (pos or neg) in coordinates
const maximumCoordinates = 300; // Minimum altitude (pos or neg) in coordinates

console.log(`Requesting TLE data from ${inputURL}`);
request(inputURL, function(err, res, body) {
  if (!err && res.statusCode == 200) {
    console.log("Processing...");
    const importedJSON = JSON.parse(body);
    process(importedJSON);
  } else {
    console.error(err);
  }
});

function process(raw) {
  let data = raw
    // Only return items within the plane bounded by inclination
    .filter(d => {
      let inc = parseFloat(d["INCLINATION"]);
      return inc > incMin && inc < incMax;
    })
    // Convert TLE data to coordinates
    .map(d => {
      tleArr = [d["TLE_LINE1"], d["TLE_LINE2"]];
      d.satInfo = tlejs.getSatelliteInfo(
        tleArr, // Satellite TLE string or array.
        Date.now(), // Timestamp (ms)
        90.0, // Observer latitude (degrees)
        135.0, // Observer longitude (degrees)
        0 // Observer elevation (km)
      );

      // Assuming polar projection
      const hLen = d.satInfo.height;
      const angleDeg = d.satInfo.lng;
      const angleRad = angleDeg * (Math.PI / 180);
      const aLen = Math.sin(angleRad) * hLen;
      const oLen = Math.cos(angleRad) * hLen;
      d.x = aLen; // Negative => Left, Positive => Right
      d.y = oLen * -1; // Negative => Up, Positive => Down

      // Calculate component velocity
      const v = d.satInfo.velocity;
      d.dx = Math.cos(angleRad) * v;
      d.dy = 0 - Math.sin(angleRad) * v;

      return d;
    });
  // // Remove items that are below the minimum required altitude
  // .filter(d => {
  //   return (
  //     d.x > minimumCoordinates ||
  //     d.y > minimumCoordinates ||
  //     d.x < minimumCoordinates * -1 ||
  //     d.y < minimumCoordinates * -1
  //   );
  // });

  // data.map(d => {
  //   console.log(`[${d.x}, ${d.y}]`);
  // });

  const coordinatesX = data.map(d => Math.abs(d.x));
  const coordinatesLeastX = Math.min(...coordinatesX);
  const coordinatesMostX = Math.max(...coordinatesX);

  const coordinatesY = data.map(d => Math.abs(d.y));
  const coordinatesLeastY = Math.min(...coordinatesY);
  const coordinatesMostY = Math.max(...coordinatesY);

  // const multiplier =
  //   (maximumCoordinates - minimumCoordinates) /
  //   (coordinatesMost - coordinatesLeast);

  // console.log(multiplier);

  // data = data.map(d => {
  //   d.x = Math.round(d.x * multiplier);
  //   d.y = Math.round(d.y * multiplier);
  //   console.log(d.x)
  //   console.log(d.y)
  //   return d;
  // });

  function scaleX(num) {
    let fit =
      ((maximumCoordinates - minimumCoordinates) * (num - coordinatesLeastX)) /
      (coordinatesMostX - coordinatesLeastX);
    fit += fit < 0 ? -minimumCoordinates : minimumCoordinates;
    return fit;
  }

  function scaleY(num) {
    let fit =
      ((maximumCoordinates - minimumCoordinates) * (num - coordinatesLeastY)) /
      (coordinatesMostY - coordinatesLeastY);
    fit += fit < 0 ? -minimumCoordinates : minimumCoordinates;
    return fit;
  }

  data = data.map(d => {
    d.x = Math.round(scaleX(d.x));
    d.y = Math.round(scaleY(d.y));
    console.log(`[ ${d.x}, ${d.y} ]`);
    return d;
  });

  console.log(
    `Found ${data.length} items within inclination range ${incMin}, ${incMax}`
  );

  const out = JSON.stringify(data);

  fs.writeFile(outputFilePath, out, err => {
    if (err) return console.error(err);
    console.log(`Saved results to ${outputFilePath}`);
  });
}
