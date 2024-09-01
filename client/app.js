function getBathValue() {
    var bath = document.getElementById('radio-bath-1');
    return bath.value !== "" ? bath.value : -1; // Return selected value or -1 if invalid
}

function getBHKValue() {
    var bhk = document.getElementById('radio-bhk-1');
    return bhk.value !== "" ? bhk.value : -1; // Return selected value or -1 if invalid
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bath = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");

    const url = 'http://127.0.0.1:5000/predict_home_price';

    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bath,
        location: location.value
    }, function (data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        console.log(status);
    });
}

function onPageLoad() {
    console.log("document loaded");
    var url = 'http://127.0.0.1:5000/get_location_names';
    $.get(url, function (data, status) {
        console.log("got response for get_location_names request");

        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            for (var i in locations) {
                var opt = new Option(locations[i]);
                uiLocations.appendChild(opt);
            }
        }
    });
}

window.onload = onPageLoad;
