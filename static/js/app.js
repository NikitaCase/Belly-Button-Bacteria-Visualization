// d3.json("data/samples.json").then(function (data) {console.log(data)})

// d3.json("samples.json").then((data) => { console.log(data)});

// url = "https://github.com/NikitaCase/belly-biodiversity/blob/main/data/samples.json"

// d3.json(url).then((data) => { console.log(data)});


// nothing above works :( 



var drop_down = d3.select("#select")
var ul_demog = d3.select("#demographics")

var arr = ['a', 'b', 'c', 'd', 'e']

for (var p = 0; p < arr.length; p++) {
    var option = drop_down.append("option")
    option.attr("value", arr[p])
    option.text(arr[p])

}


var dict =[{
    a: 'aa', 
    b: 'bb', 
    c: 'cc', 
    d: 'dd'
}]

function print_subject_data(){
    dict.forEach((pair) => {
        
        
        Object.entries(pair).forEach(([key, value]) => {
            var li = ul_demog.append("li")
            li.text(`${key} : ${value}`)
        })


    })
}
print_subject_data()




/* <option value="t" >t</option> */
