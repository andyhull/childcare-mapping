// Create and load map
$('#map').mapbox('andyhull.map-qflr4pt1', function(map, tilejson) {
    // style, the file must be on the same domain name as the map,
    // or loading will not work due to cross-domain request restrictions
    // var childcarecenters = mapbox.markers.layer().url('data/childcarecenters.geojson');
    // mapbox.markers.interaction(childcarecenters);
    // map.addLayer(childcarecenters);

    var container = $('#markerfilters');
    var childcarecenters = mapbox.markers.layer();
    map.addLayer(childcarecenters);
    childcarecenters.url('data/childcarecenters.geojson', function(features, layer) {
    // All code to be run after loading markers goes in here
    // console.log('features '+features);
    console.log(layer);
    $.each(layer, function(index, m){
        console.log('index '+index);
        console.log(m);
        var s = m.data.properties['infant'];
        if (container.find('[href="#' + s + '"]').length) return;

        var el = $(document.createElement('a'))
            .addClass('markerfilter')
            .attr('href', '#' + s)
            .css('background-image', 'url(http://a.tiles.mapbox.com/v3/marker/pin-l-'+s+'+000000.png)')
            .bind('click', filter);
        container.append(el);
    })
    });

    map.setZoomRange(0, 18);
    map.centerzoom({lat:37.74110000000002, lon:-122.40589999999996}, 12);

    // Add share control
    // mapbox.share().map(map).add();

    // $.each(childcarecenters.markers(), function(index, m) {
    //     console.log("hey"+m);
    //     var s = m.data.properties['infant'];

    //     if (container.find('[href="#' + s + '"]').length) return;

    //     var el = $(document.createElement('a'))
    //         .addClass('markerfilter')
    //         .attr('href', '#' + s)
    //         .css('background-image', 'url(http://a.tiles.mapbox.com/v3/marker/pin-l-'+s+'+000000.png)')
    //         .bind('click', filter);
    //     container.append(el);
    // });


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
