async function fetchDataAndVisualize() {
    populateFilters()
    try {
        const response = await fetch('http://127.0.0.1:8000/dashboard/api');
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        visualizeData(data);
        visualizeScatterPlot(data);
        visualizeTopicsPieChart(data);
        visualizeRegionsBarChart(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function visualizeData(data) {
    const likelihoodValues = data.filter(entry => entry.likelihood !== null).map(entry => entry.likelihood);
    const relevanceValues = data.filter(entry => entry.relevance !== null).map(entry => entry.relevance);
    const countries = data.filter(entry => entry.country !== null).map(entry => entry.country);

    const likelihoodChart = {
        x: countries,
        y: likelihoodValues,
        type: 'bar',
        name: 'Likelihood'
    };

    const relevanceChart = {
        x: countries,
        y: relevanceValues,
        type: 'bar',
        name: 'Relevance'
    };

    const layout = {
        title: 'Data Visualization',
        xaxis: { title: 'Countries' },
        yaxis: { title: 'Value' },
        height: 400,
        width: 500
    };

    // Plot charts
    Plotly.newPlot('charts', [likelihoodChart, relevanceChart], layout);
}

function visualizeScatterPlot(data) {
    const topic=data.filter(entry => entry.topic !== null).map(entry => entry.topic);
    const relevance = data.filter(entry => entry.relevance !== null).map(entry => entry.relevance);

    const scatterPlotData = {
        x: topic,
        y: relevance,
        mode: 'markers',
        type: 'scatter',
        name: 'Intensity vs Likelihood'
    };

    const layout = {
        title: 'Topic vs Relevance',
        xaxis: { title: 'Topic' },
        yaxis: { title: 'Relevance' },
        height: 400,
        width: 500
    };

    Plotly.newPlot('scatterPlot', [scatterPlotData], layout);
}
function visualizeTopicsPieChart(data) {
    const topics = data.filter(entry => entry.topic !== null).map(entry => entry.topic);
    const topicsCount = {};
    topics.forEach(topic => {
        topicsCount[topic] = (topicsCount[topic] || 0) + 1;
    });

    const topicsData = [{
        labels: Object.keys(topicsCount),
        values: Object.values(topicsCount),
        type: 'pie',
        textinfo: 'label+percent',
        textposition: 'inside',
        name: 'Topics'
    }];

    const layout = {
        title: 'Intensity vs Likelihood',
        xaxis: { title: 'Intensity' },
        yaxis: { title: 'Likelihood' },
        height: 400,
        width: 500
    };


    Plotly.newPlot('topicsPieChart', topicsData, layout);
        }
function visualizeRegionsBarChart(data){
    const countries = data.filter(entry => entry.country !== null).map(entry => entry.country);
    const intensityValues = data.filter(entry => entry.intensity !== null).map(entry => entry.intensity);
    const regionsChart = {
        x: countries,
        y: intensityValues,
        type: 'bar',
        name: 'Regions'
    };
    const layout = {
        title: 'Country vs Intensity',
        xaxis: { title: 'countries' },
        yaxis: { title: 'intensity' },
        height: 400,
        width: 500
    };
    Plotly.newPlot('regionsBarChart', [regionsChart], layout);
}
window.onload = fetchDataAndVisualize;