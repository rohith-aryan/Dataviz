
function applyfilters() {
    // Collect non-null select elements values
    const queryParams = {};
    const selects = document.querySelectorAll("select");
    selects.forEach(select => {
        if (select.value !== "") {
            queryParams[select.name] = select.value;
        }
    });

    // Construct API endpoint URL with query parameters
    const apiUrl = "http://127.0.0.1:8000/dashboard/api";
    const url = new URL(apiUrl);
    url.search = new URLSearchParams(queryParams).toString();
    console.log(url)

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            console.log("data",data);
            if(data.length === 0) {
            document.getElementById('nodataDisplay').style.display = 'block';
            document.getElementById('dataDisplay').style.display = 'none';
                
        }
            else{
            document.getElementById('nodataDisplay').style.display = 'none';
            document.getElementById('dataDisplay').style.display = 'block';
            visualizeData(data);
            visualizeScatterPlot(data);
            visualizeTopicsPieChart(data);
            visualizeRegionsBarChart(data);}
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

