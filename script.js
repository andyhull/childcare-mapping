// Create and load map
$('#map').mapbox('andyhull.map-qflr4pt1', function(map, tilejson) {
    // style, the file must be on the same domain name as the map,
    // or loading will not work due to cross-domain request restrictions
    var childcarecenters = mapbox.markers.layer().url('data/childcarecenters.geojson');
    mapbox.markers.interaction(childcarecenters);
    map.addLayer(childcarecenters);

    map.setZoomRange(0, 18);
    map.centerzoom({lat:37.74110000000002, lon:-122.40589999999996}, 12);

    // Add share control
    mapbox.share().map(map).add();

    // Set title and description from tilejson
    document.title = tilejson.name;
    $('h1.map-title').text(tilejson.name);
    $('p.description').text(tilejson.description);

console.log(childcarecenters);
console.log(childcarecenters.features();
    var container = $('#markerfilters');
    $.each(childcarecenters.markers(), function(index, m) {
        console.log("hey"+m);
        var s = m.data.properties['infant'];

        if (container.find('[href="#' + s + '"]').length) return;

        var el = $(document.createElement('a'))
            .addClass('markerfilter')
            .attr('href', '#' + s)
            .css('background-image', 'url(http://a.tiles.mapbox.com/v3/marker/pin-l-'+s+'+000000.png)')
            .bind('click', filter);
        container.append(el);
    });


    $('[href="#all"]').bind('click', filter); 


    function filter(e) {
        container.find('a').removeClass('selected');
        var id = $(this).addClass('selected').attr('href').replace('#', '');
        tilejson.markers.filter(function(feature) {
            return feature.properties['infant'] == id || id == 'all';
        });
        return false;
    }
});
