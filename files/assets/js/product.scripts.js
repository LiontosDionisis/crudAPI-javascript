$(document).ready(function(){
    $.ajax({
        url: "http://localhost:3000/api/products",
        type: "get",
        dataType: "JSON"
    })
    .done(function(res){
        let data = res.data;
        let status = res.status
        
        if(status) {
            createTbody(data);
        } else {
            alert(false, "Error in finding products")
        }
    })
})


function createTbody(data){
    $("#productTable > tbody").empty();

    const len = data.length;
    for (let i = 0; i<len; i++) {
        let product = data[i].product
        let cost = data[i].cost
        let description = data[i].description
        let quantity = data[i].quantity

        let tr_str = "<tr>" + 
        "<td>" + product + "</td>" +
        "<td>" + cost + "</td>" +
        "<td>" + description + "</td>" +
        "<td>" + quantity + "</td>"

        $("#productTable tbody").append(tr_str);
    }

   


}