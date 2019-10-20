const request = require("request");
const fs = require("fs");
const TLEJS = require("tle.js");
const tlejs = new TLEJS();

const inputURL =
  "https://github.com/WorldWindLabs/SpaceBirds/raw/master/Backend_nodejs_stuff/TLE.json";
const outputFilePath = "./src/data/full.json";

const incMin = -2; // Minimum Inclination (orbit angle from equator)
const incMax = 2; // Maximum Inclination (orbit angle from equator)

const minimumCoordinates = 150; // Minimum altitude (pos or neg) in coordinates
const maximumCoordinates = 400; // Minimum altitude (pos or neg) in coordinates

const minimumSpacing = 1;

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
      d.dy = Math.sin(angleRad) * v;

      return d;
    });

  // data.map(d => {
  //   console.log(`[${d.x}, ${d.y}]`);
  // });

  const coordinates = []
    .concat(data.map(d => Math.abs(d["APOGEE"])))
    .concat(data.map(d => Math.abs(d["PERIGEE"])));
  const coordinatesLeast = Math.min(...coordinates);
  const coordinatesMost = Math.max(...coordinates);

  function toCoordinateUnits(num) {
    return (
      (maximumCoordinates * (num - coordinatesLeast)) /
      (coordinatesMost - coordinatesLeast)
    );
  }

  data = data.map(d => {
    d.x = toCoordinateUnits(d.x);
    d.y = toCoordinateUnits(d.y);
    d.maxAlt = toCoordinateUnits(d["APOGEE"]);
    d.minAlt = toCoordinateUnits(d["PERIGEE"]);
    return d;
  });

  // Remove items that are below the minimum required altitude
  data = data.filter(d => {
    return (
      d.x > minimumCoordinates ||
      d.y > minimumCoordinates ||
      d.x < minimumCoordinates * -1 ||
      d.y < minimumCoordinates * -1
    );
  });

  const usedCoords = [];
  data = data.filter(d => {
    // Check if item too close to any existing items
    if (
      usedCoords.filter(
        c =>
          Math.abs(d.x - c[0]) < minimumSpacing &&
          Math.abs(d.y - c[1]) < minimumSpacing
      ).length
    )
      return false;
    else {
      usedCoords.push([d.x, d.y]);
      return true;
    }
  });

  data.map(d => {
    console.log(`[${d.x}, ${d.y}]`);
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
