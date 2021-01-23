// Plot Guage
// Uses variable from app.js

function plot_guage(wfreq) {
    var data_guage = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,

        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {
                range: [null, 9]
            },
            steps: [
                { range: [0, 1], color: "#f8f3ec" },
                { range: [1, 2], color: "#f4f1e5" },
                { range: [2, 3], color: "#e9e6ca" },
                { range: [3, 4], color: "#e5e7b3" },
                { range: [4, 5], color: "#d5e49d" },
                { range: [5, 6], color: "#b7cc92" },
                { range: [6, 7], color: "#8cbf88" },
                { range: [7, 8], color: "#8abb8f" },
                { range: [8, 9], color: "#85b48a" }
            ],
        }
    }];

    Plotly.newPlot("guage", data_guage)
};