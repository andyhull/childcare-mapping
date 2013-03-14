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
        $.each(layer, function(index, m){
        //get all the individual geojson records
            // console.log('index '+index);
            // console.log(m);
            // var infant = m.properties['infant'];
            if (container.find('[href="#infant"]').length) return;
            if (container.find('[href="#preschool"]').length) return;
            if(m.properties['infant']==1){
                var el = $(document.createElement('a'))
                    .addClass('markerfilter')
                    .attr('href', '#infant')
                    .css('background-image', 'url(http://a.tiles.mapbox.com/v3/marker/pin-l-000000.png)')
                    .bind('click', filterInfant);
                container.append(el);

            } else if(m.properties['preschool']==1){
                var el = $(document.createElement('a'))
                    .addClass('markerfilter')
                    .attr('href', '#preschool')
                    .css('background-image', 'url(http://a.tiles.mapbox.com/v3/marker/pin-l-000000.png)')
                    .bind('click', filterPreschool);
                container.append(el);
            } 
        });
    });
console.log(childcarecenters);
         function filterInfant(e) {
            container.find('a').removeClass('selected');
            var id = $(this).addClass('selected').attr('href').replace('#', '');
            childcarecenters.filter(function(feature) {
                return feature.properties['infant'] == 1 || id == 'all';
            });
            return false;
        }
        function filterPreschool(e) {
            container.find('a').removeClass('selected');
            var id = $(this).addClass('selected').attr('href').replace('#', '');
            childcarecenters.filter(function(feature) {
                return feature.properties['preschool'] == 1 || id == 'all';
            });
            return false;
        }

    map.setZoomRange(0, 18);

    $('[href="#all"]').bind('click', filter); 


    function filter(e) {
        container.find('a').removeClass('selected');
        var id = $(this).addClass('selected').attr('href').replace('#', '');
        childcarecenters.filter(function(feature) {
            return feature.properties['infant'] == 1 || id == 'all';
        });
        return false;
    }
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

});
