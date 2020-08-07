(function (ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function () { };

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function () {
        return { status: 2, msg: 'Ready' };
    };
    ext.get_temp = function (location, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({

            // http://api.openweathermap.org/data/2.5/weather?q=Melbourne,Vic,AU&APPID=2bc06d5dd1d2efd05225de480bf76e3a
            url = 'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=439d4b804bc8187953eb36d2a8c26a02',
            // url: 'http://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric&APPID=2bc06d5dd1d2efd05225de480bf76e3a',
            dataType: 'jsonp',
            success: function (weather_data) {
                // Got the data - parse it and return the temperature
                temperature = weather_data['main']['temp'];
                callback(temperature);
            }
        });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'current temperature in city %s', 'get_temp', 'Boston, MA'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('rosie', descriptor, ext);
})({});