
// dropdown
function init() {

d3.json("samples.json").then((x) => {
    var sample_ID=x.names 
    var sample_name=d3.select("#selDataset")
    sample_ID.forEach((y)=>{
        sample_name.append("option")
        .text(y)
        .property("value",y)
    });
    var first_ID=sample_ID[0];
    demo_table(first_ID);
    chart_table(first_ID);
})
}

//run the init function
init()
function optionChanged(sample_one){
    demo_table(sample_one);
    chart_table(sample_one);
}

// demographic info table
function demo_table(sample){
    d3.json("samples.json").then((x) => {
        var metadata=x.metadata
        var sample_metadata=d3.select("#sample-metadata")
        var filterdata=metadata.filter(y => y.id == sample)
        console.log(filterdata)

        var filterdata1=filterdata[0]
        console.log(filterdata1)

        sample_metadata.html("");

        Object.entries(filterdata1).forEach(function([key, value]) {            
            var row = sample_metadata.append("tr");
            console.log(key,value);
            row.append("td").html(`<strong><font size = '1'>${key}</font></strong>:`);
            console.log(key,value);
            row.append('td').html(`<font size ='1'>${value}</font>`);
            console.log(key,value);
        });     
        });
};


function chart_table(new_sample){
    d3.json("samples.json").then(function(response) {
        var samples_data=response.samples
        var filterdata=samples_data.filter(y => y.id == new_sample)
        console.log(filterdata);
        filterdata1=filterdata[0];
        console.log(filterdata1);

        var otu_labels_graph=filterdata1.otu_labels;
        var sample_values_graph=filterdata1.sample_values;
        var otu_ids_graph=filterdata1.otu_ids;

        //bar chart
        var trace1={
            type: "bar",
            y: otu_ids_graph.slice(0,10).map(x=>`OTU ${x}`),
            x: sample_values_graph.slice(0,10),
            orientation: "h"
        };

        var chartData = [trace1];

        var layout={
            title:"Bar Chart",
            backgroundColor: otu_ids_graph,
            text: otu_labels_graph
        };

        Plotly.newPlot("bar",chartData,layout);
            
    

        //bubble chart 
        var trace2={
            mode: "markers",
            x: otu_ids_graph,
            y: sample_values_graph,
            // r: sample_values_graph,
            marker: {
                size: sample_values_graph,
                color: otu_ids_graph
            }
        };
        
        var chartData2 = [trace2];

        var layout={
            title:"Bubble Chart",
            backgroundColor: otu_ids_graph,
            text: otu_labels_graph
        };
            
        Plotly.newPlot("bubble",chartData2,layout);

    });
};


    // });
//     // chart_table(newSample);
//     demo_table(newSample);




//    
  