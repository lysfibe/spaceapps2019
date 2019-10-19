const request = require("request");
const fs = require("fs");
const TLEJS = require("tle.js");
const tlejs = new TLEJS();

const inputURL =
  "https://github.com/WorldWindLabs/SpaceBirds/raw/master/Backend_nodejs_stuff/TLE.json";
const outputFilePath = "./src/data/full.json";

const incMin = -2; // Minimum Inclination (orbit angle from equator)
const incMax = 2; // Maximum Inclination (orbit angle from equator)

const metersToCoordinates = 1 / 100; // Conversion for meters to coordinates
const minimumCoordinates = 150; // Minimum altitude in coordinates

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
  const data = raw
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
      d.x = toCoordinate(aLen); // Negative => Left, Positive => Right
      d.y = toCoordinate(oLen) * -1; // Negative => Up, Positive => Down
      return d;
    })
    // Remove items that are below the minimum required altitude
    .filter(d => {
      return (
        d.x > minimumCoordinates ||
        d.y > minimumCoordinates ||
        d.x < minimumCoordinates * -1 ||
        d.y < minimumCoordinates * -1
      );
    });

  // data.map(d => {
  //   console.log(`[${d.x}, ${d.y}]`);
  // });

  const coordinateAltitudes = data.map(d =>
    Math.max(Math.abs(d.x), Math.abs(d.y))
  );
  const coordinatesLeast = Math.min(...coordinateAltitudes);
  const coordinatesMost = Math.max(...coordinateAltitudes);

  console.log(`
Found ${data.length} items within inclination range ${incMin}, ${incMax} 
and mapped to coordinates between ${coordinatesLeast} - ${coordinatesMost} from 0,0
`);

  const out = JSON.stringify(data);

  fs.writeFile(outputFilePath, out, err => {
    if (err) return console.error(err);
    console.log(`Saved results to ${outputFilePath}`);
  });
}

function toCoordinate(x) {
  return Math.round(x * metersToCoordinates);
}
