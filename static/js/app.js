// Assigning variable names to tags which will be manipulated in html file 
var drop_down = d3.select("#select")
var ul_demog = d3.select("#demographics")
var hbar = d3.select("#horizontal-bar")
var bubble = d3.select("#bubble")
var bubble_title = d3.select("#bubble-title")
var page_subtitle = d3.select("#page-subtitle")


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

        bubble.text(" \n \n Select a test subject ID from the drop down menu to display the subject's data  \n \n ")

    }
}


// Gather user input and activate the plotting functions once listener is activated 
function plot_data() {
    var user_subject = drop_down.node().value
    display_subject_metadata(user_subject)
    plot_sample_data(user_subject)

    //  Clear first set of instructions and display second set 
    bubble.text("")
    page_subtitle.html("Hover over bars and circles on the graphs to reveal bacteria names")

}


// Display demographic data based on user selection 
function display_subject_metadata(user_subject) {

    // use d3 to load json file 
    d3.json("data/samples.json").then((data) => {

        // Find demographic data on all subjects
        var all_subject_metadata = data.metadata

        // Filter metadata by id (user input)
        var subject_metadata = all_subject_metadata.filter(row => row.id == user_subject)

        // Isolate data that will be used to plot the guage from the bonus.js file 
        var wfreq = subject_metadata[0].wfreq
        plot_guage(wfreq)

        // Clear previous output in div for demogrphics
        ul_demog.html("")

        // Display demographics in a list 
        subject_metadata.forEach(pair => {
            Object.entries(pair).forEach(([key, value]) => {
                var li = ul_demog.append("li")
                li.text(`${key} : ${value}`)
            })
        });
    })
}


// Plot data from sample data based on user selection 
function plot_sample_data(user_subject) {

    d3.json("data/samples.json").then((data) => {

        // Select all sample data  
        var all_samples = data.samples

        // Filter by id (user input)
        var subject_samples = all_samples.filter(row => row.id == user_subject)
        var results = subject_samples[0]
        var { sample_values, otu_labels, otu_ids } = results

        //  Plot the  bubble Chart
        var data_bubble = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids
            }
        }];

        var layout_bubble = {
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };

        var config = { responsive: true }

        Plotly.newPlot("bubble", data_bubble, layout_bubble, config);
        bubble_title.html(`Bacterial Groups Isolated from Subject ${user_subject}`)


        // Add Sample data to array to so data can be sorted, sliced, reversed  
        var samples_arr = []

        for (var n = 0; n < sample_values.length; n++) {
            var dict = {}
            dict.value = sample_values[n]
            dict.otu_id = otu_ids[n]
            dict.label = otu_labels[n]
            samples_arr.push(dict)
        }

        var sorted_results = samples_arr.sort((a, b) => b.value - a.value)
        var top_samples = sorted_results.slice(0, 10)
        top_samples = top_samples.reverse()

        console.log(sorted_results)


        // Plot Bar Graph of top 10 samples 
        var bar_data = [{
            x: top_samples.map(a => a.value),
            y: top_samples.map(a => `otu_id: ${a.otu_id}`),
            text: top_samples.map(a => a.label),
            name: "Belly Flora",
            type: "bar",
            orientation: "h"

        }]

        Plotly.newPlot("horizontal-bar", bar_data, config)
    })
}



// Assign a listener to the drop down menu 
drop_down.on("change", plot_data)