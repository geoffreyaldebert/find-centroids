const fs = require('fs')
const turfCentroid = require('turf-centroid');
const files = fs.readdirSync('./geojson/')
console.log(files)

files.forEach((f) => {
    var result = {
        "type": "FeatureCollection",
        "features": []
    }
    var geojson = require('./geojson/' + f)

    for (var i = 0; i < geojson.features.length; i++) {
        result.features.push(
            {
                "type": "Feature",
                "properties": {'code': geojson.features[i].properties.code, 'nom': geojson.features[i].properties.nom},
                "geometry": turfCentroid(geojson.features[i]).geometry
            }
        );
    }
    fs.writeFile('./centroids/centroids-' + f, JSON.stringify(result, null, '  '), function (err) {
      if (err) throw err;
      console.log('Saved centroids-'+f);
    });
})