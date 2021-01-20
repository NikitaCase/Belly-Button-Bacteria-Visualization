// Assigning variable names to tags which will be manipulated in html file 
var drop_down = d3.select("#select")
var ul_demog = d3.select("#demographics")


// Call the function which searches for the user ids 
get_subject_ids()

function get_subject_ids() {
    d3.json("data/samples.json").then((data) => {
        // var subject_ids = data.names
        var subject_ids = data.names.map(row => row)
        populate_drop_down(subject_ids)

    })

}
// Populate the drop down menu with the output from the previous function 
function populate_drop_down(subject_ids) {
    for (var p = 0; p < subject_ids.length; p++) {


        var option = drop_down.append("option")
        option.attr("value", subject_ids[p])
        option.text(subject_ids[p])

    }
}

// Display demographic data based on user selection 
function display_subject_metadata() {

    var user_subject = drop_down.node().value

    d3.json("data/samples.json").then((data) => {

        // Find demographic data on all subjects
        var all_subject_metadata = data.metadata

        // Filter subjects by id (user input)
        var subject_metadata = all_subject_metadata.filter(row => row.id == user_subject)

        console.log(subject_metadata)

        // Clear previous output
        ul_demog.html("")


        subject_metadata.forEach(pair => {
            Object.entries(pair).forEach(([key, value]) => {
                var li = ul_demog.append("li")
                li.text(`${key} : ${value}`)
                console.log('here')
            })

        });


    })
}


// Assign a listener to the drop down menu 
drop_down.on("change", display_subject_metadata)