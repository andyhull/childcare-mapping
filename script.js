// Create and load map
$('#map').mapbox('andyhull.map-qflr4pt1', function(map, tilejson) {
    // style, the file must be on the same domain name as the map,
    // or loading will not work due to cross-domain request restrictions

    var container = $('#markerfilters');
    var childcarecenters = mapbox.markers.layer();
    map.addLayer(childcarecenters);
    childcarecenters.url('data/childcarecenters.geojson')
    //create the tooltips here
    mapbox.markers.interaction(childcarecenters).formatter(function(feature) {
            var div = document.createElement('div');
            var title = div.appendChild(document.createElement('h3'));
            title.innerHTML = feature.properties["name"];
            return div;
        });
    if (container.find('[href="#infant"]').length) return;
    if (container.find('[href="#preschool"]').length) return;
        var el = $(document.createElement('a'))
            .addClass('markerfilter')
            .attr('href', '#infant')
            .css('background-image', 'url(http://a.tiles.mapbox.com/v3/marker/pin-l-000000.png)')
            .text('Infant')
            .bind('click', filterInfant);
        container.append(el);
        // var el = $(document.createElement('a'))
        //     .addClass('markerfilter')
        //     .attr('href', '#preschool')
        //     .css('background-image', 'url(http://a.tiles.mapbox.com/v3/marker/pin-l-000000.png)')
        //     .text('Preschool')
        //     .bind('click', filterPreschool);
        // container.append(el);
        
     function filterInfant(e) {
        container.find('a').removeClass('selected');
        var id = $(this).addClass('selected').attr('href').replace('#', '');
        childcarecenters.filter(function(feature) {
            return feature.properties['infant'] == 1 || id == 'all';
        });
        return false;
    }
    // function filterPreschool(e) {
    //     container.find('a').removeClass('selected');
    //     var id = $(this).addClass('selected').attr('href').replace('#', '');
    //     childcarecenters.filter(function(feature) {
    //         return feature.properties['preschool'] == 1 || id == 'all';
    //     });
    //     return false;
    // }

    map.setZoomRange(0, 18);

    $('[href="#all"]').bind('click', filter); 


    function filter(e) {
        container.find('a').removeClass('selected');
        var id = $(this).addClass('selected').attr('href').replace('#', '');
        return false;
    }
    map.centerzoom({lat:37.74110000000002, lon:-122.40589999999996}, 12);

});
