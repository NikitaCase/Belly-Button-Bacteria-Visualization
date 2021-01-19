// d3.json("data/samples.json").then(function (data) {console.log(data)})

// d3.json("samples.json").then((data) => { console.log(data)});

// url = "https://github.com/NikitaCase/belly-biodiversity/blob/main/data/samples.json"

// d3.json(url).then((data) => { console.log(data)});


// nothing above works :( 



var drop_down = d3.select("#select")

var arr = ['a', 'b', 'c', 'd', 'e']

for (var p = 0; p < arr.length; p++) {
    var option = drop_down.append("option")
    option.attr("value", arr[p])
    option.text(arr[p])

}


/* <option value="t" >t</option> */
