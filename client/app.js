function getBathValue(){
    var bath = document.getElementById('uiBathrooms');
    for(var i in bath){
        if(bath[i].checked){
            return bath[i].value;
        }
    }
    return -1; // Invalid Value
}

function getBHKValue(){
    var bhk = document.getElementById('uiBHK');
    for(var i in bhk){
        if(bhk[i].checked){
            return bhk[i].value;
        }
    }
    return -1; // Invalid Value
}

function onClickedEstimatePrice(){
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bath = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");

    const url = 'http://127.0.0.1:5000/predict_home_price'

    $.post(url,{
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bath,
        location: location.value
    },(data,status)=>{
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        console.log(status);
        
    })
    
}

function onPageLoad(){
    console.log("document loaded");
    var url = 'http://127.0.0.1:5000/get_location_names'
    $.get(url,function(data,status) {
        console.log("got response for get_location_names request");

        if(data){
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            for(var i in locations){
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
        
    })
    
}

window.onload = onPageLoad;