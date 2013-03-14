// Create and load map
$('#map').mapbox('andyhull.map-qflr4pt1', function(map, tilejson) {
    // style, the file must be on the same domain name as the map,
    // or loading will not work due to cross-domain request restrictions
    var markers = mapbox.markers.layer().url('data/childcarecenters.geojson');
    mapbox.markers.interaction(markers);
    map.addLayer(markers);

    map.setZoomRange(0, 15);
    map.centerzoom({lat:37.74110000000002, lon:-122.40589999999996}, 12);

    // Add share control
    mapbox.share().map(map).add();

    // Set title and description from tilejson
    document.title = tilejson.name;
    $('h1.map-title').text(tilejson.name);
    $('p.description').text(tilejson.description);


    var container = $('#markerfilters');
    $.each(tilejson.markers.markers(), function(index, m) {
        var s = m.data.properties['marker-symbol'];

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
            return feature.properties['marker-symbol'] == id || id == 'all';
        });
        return false;
    }
});
