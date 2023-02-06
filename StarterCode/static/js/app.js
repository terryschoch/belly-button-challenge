// Define the url to be scraped for data as a "const"
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// -------------------------------------------------------------------------
// Drop Down Menu

// Define an "init(ialize)" function to load dropdown menu and trigger a splashpage featuring a default Sample/Test Subject
function init() {
    // Grab a reference to the dropdown select element within the index.html
    let dropdownMenu = d3.select("#selDataset");        
    // Fetch the JSON data and isolate the sample names by defining a function/=> to search within retrieved "data"
    d3.json(url).then((data) => {
        // Define "sampleName" local variable to contain all retrieved Test Subject "names"
        let sampleName = data.names;
        console.log(sampleName);        
        // Populate the dropdown menu with the names by chaining together .append, .text. and .property
        sampleName.forEach((sample) => {
            dropdownMenu.append("option").text(sample).property("value", sample);    
        });
        // Isolate the first sampleName result and use it to build the default plots and demographic info ("dashboard" function)
        let firstSample = sampleName[0];
        console.log(firstSample);
        dashboard(firstSample);
    });
};

// Initialize dashboard by calling "init" function
init();


// -------------------------------------------------------------------------
// Click Reaction - optionChanged function 

// Define "optionChanged" function found within index.html
function optionChanged(newSelection) {
    // Fetch correct refreshed data each time a new sample selection is made via dashboard function
    dashboard(newSelection);    
};


// -------------------------------------------------------------------------
// Dashboard Information (Charts and Demographics)

// Define a "dashboard" function to plot horizontal bar chart of top 10 OTUs per sample, bubble chart and populate Demographic Information panel
function dashboard(sample) {
    // Fetch the JSON data and define functions (=>) within to search for desired info to filter
    d3.json(url).then((data) => {
        // Define local variable to hold "samples" information
        let samplesInfo = data.samples;
        console.log(samplesInfo)
        // Filter through "samplesInfo" to find correct "samples" info relative to Test Subject/Sample selected in drop down menu
        let sampleSelected = samplesInfo.filter(samplesID => samplesID.id == sample);
        console.log(sampleSelected);
        // Traverse "sampleSelected" and define local variables to hold otu_ids, otu_labels, and sample_values for charting
        let otu_ids = sampleSelected[0].otu_ids;
        console.log(otu_ids);
        let otu_labels = sampleSelected[0].otu_labels;
        console.log(otu_labels);
        let sample_values = sampleSelected[0].sample_values;
        console.log(sample_values);


        // -------------------------------------------------------------------------
        // Bar Chart
                
        // Use .slice to determine top ten ids, labelsand values; apply .reverse to list in descending order for plotting and define as local variables
        let topOtu_ids = otu_ids.slice(0, 10).reverse();
        console.log(topOtu_ids);
        let topOtu_labels = otu_labels.slice(0, 10).reverse();
        console.log(topOtu_labels);
        let topSample_values = sample_values.slice(0, 10).reverse();
        console.log(topSample_values);        
        // Transform topOtu_ids to be used as yticks using .map function
        let topOtu_yds = topOtu_ids.map(item => `OTU ${item}`);                   
        
        // Trace bar chart for the selected Test Subject/Sample data
        let trace1 = {
            x: topSample_values,
            y: topOtu_yds,
            type: 'bar',
            orientation: 'h',
            text: topOtu_labels            
        }

        // Data trace array
        let barData = [trace1];

        // Define barLayout and add title, height, width, etc.
        let barLayout = {
            title: `<b>Top 10 OTUs found within Test Subject ${sample}</b>`,
            showlegend: false,
            height: 500,
            width: 500
        };

        // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar", barData, barLayout);

        
        // -------------------------------------------------------------------------
        // Bubble Chart
        
        // Trace bubble chart for the selected Test Subject/Sample data
        let trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                colorscale: "Jet",
                size: sample_values,
            }
        };
        
        // Data trace array
        let bubbleData = [trace2];
        
        // Define bubbleLayout and add title, height, width, etc.
        let bubbleLayout = {
            title: `<b>Microbe Types and Counts found within Test Subject ${sample}</b>`,
            showlegend: false,
            height: 550,
            width: 1100,
            xaxis: {
                title: "OTU ID"
            }
        };

        // Render the plot to the div tag with id "bubble"
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
        

        // -------------------------------------------------------------------------
        // Demographic Info Panel

        // Define local variable to hold retrieved "metadata" information
        let metadataInfo = data.metadata;
        console.log(metadataInfo);
        // Filter through "metadataInfo" to find correct "metadata" relative to selected Test Subject/Sample selected
        let metadataSelected = metadataInfo.filter(metadataID => metadataID.id == sample);
        console.log(metadataSelected);     
        // Define local variable to hold key-value pairs using Object.entries function
        let infoSelected = Object.entries(metadataSelected[0])
        // Use D3 to select the panel body by its class and define as variable
        let panel = d3.select(".panel-body")
        // Use .html("") function to overwrite/clear contents of panel with each new selection
        panel.html("");
        // Use .forEach to create function to loop through "infoSelected" key-value pairs and use .append to add them to the "Demographic Info" panel
        infoSelected.forEach(([key, value]) => {            
            panel.append("h6").text(`${key}: ${value}`)    
        }); 

        
        // -------------------------------------------------------------------------
        // Gauge Chart - Optional Bonus

        // Define a variable to hold the washing frequency of Test Subject/Sample        
        let wfreq = parseFloat(metadataSelected[0].wfreq)
        console.log(wfreq)

        // Trace gauge chart for the selected Test Subject/Sample data
        let gaugeData = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b> <br>Scrubs per Week" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {                
                axis: {                    
                    range: [null, 9],
                    tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]                       
                },
                steps: [
                    { range: [0, 1], color: "dimgray" },
                    { range: [1, 2], color: "gray" },
                    { range: [2, 3], color: "lightgray" },
                    { range: [3, 4], color: "aliceblue" },
                    { range: [4, 5], color: "mintcream" },
                    { range: [5, 6], color: "paleturquoise" },
                    { range: [6, 7], color: "turquoise" },
                    { range: [7, 8], color: "mediumturquoise" },
                    { range: [8, 9], color: "darkturquoise" }
                ],
                borderwidth: 0,
                bar: {
                    color: "red",
                    line: {
                        width: 1,
                        color: "black"
                    }
                }
            }
        }];
              
        // Define bubbleLayout and add title, height, width, etc.
        let gaugeLayout = { 
            width: 400, 
            height: 330,           
            margin: { t: 0, b: 0 } 
        };

        // Render the plot to the div tag with id "gauge"
        Plotly.newPlot('gauge', gaugeData, gaugeLayout);
    })
};