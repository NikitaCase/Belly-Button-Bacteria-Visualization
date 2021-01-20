// Assigning variable names to tags which will be manipulated in html file 
var drop_down = d3.select("#select")
var ul_demog = d3.select("#demographics")
var hbar = d3.select("#horizontal-bar")
var guage = d3.select("#guage")
var bubble = d3.select("#bubble")

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

function plot_data() {
    var user_subject = drop_down.node().value
    display_subject_metadata(user_subject)
    plot_hbar(user_subject)
}

// Display demographic data based on user selection 
function display_subject_metadata(user_subject) {

    // var user_subject = drop_down.node().value

    d3.json("data/samples.json").then((data) => {

        // Find demographic data on all subjects
        var all_subject_metadata = data.metadata

        // Filter subjects by id (user input)
        var subject_metadata = all_subject_metadata.filter(row => row.id == user_subject)

        // console.log(`metadata ${subject_metadata}`)

        // Clear previous output
        ul_demog.html("")


        subject_metadata.forEach(pair => {
            Object.entries(pair).forEach(([key, value]) => {
                var li = ul_demog.append("li")
                li.text(`${key} : ${value}`)
                    // console.log('here')
            })

        });


    })
}


function plot_hbar(user_subject) {

    // var user_subject = drop_down.node().value

    d3.json("data/samples.json").then((data) => {
        var all_samples = data.samples

        var subject_samples = all_samples.filter(row => row.id == user_subject)
        var sample_values =

            var otu_ids = subject_samples[0].otu_ids
        var sorted_otu_ids = otu_ids.sort((a, b) => b - a)
        var top_otu_ids = sorted_otu_ids.slice(0, 10)




        hbar.html("")
        console.log(otu_ids)


        console.log(top_otu_ids)

        // console.log(` samples ${subject_samples}`)

    })

}



// Assign a listener to the drop down menu 
drop_down.on("change", plot_data)