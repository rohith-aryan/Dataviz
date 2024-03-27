    async function populateFilters() {
        try {
            const response = await fetch('http://127.0.0.1:8000/dashboard/api');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            const endYearSelect = document.getElementById('end_year');
            const uniqueEndYears = [...new Set(data.map(entry => entry.end_year))].filter(year => year !== null);
            uniqueEndYears.forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                endYearSelect.appendChild(option);
            });

            const topicSelect = document.getElementById('topic');
            const uniqueTopics = [...new Set(data.map(entry => entry.topic))].filter(topic => topic !== null);
            uniqueTopics.forEach(topic => {
                const option = document.createElement('option');
                option.value = topic;
                option.textContent = topic;
                topicSelect.appendChild(option);
            });

            const sectorSelect = document.getElementById('sector');
            const uniqueSectors = [...new Set(data.map(entry => entry.sector))].filter(sector => sector !== null);
            uniqueSectors.forEach(sector => {
                const option = document.createElement('option');
                option.value = sector;
                option.textContent = sector;
                sectorSelect.appendChild(option);
            });

            const regionSelect = document.getElementById('region');
            const uniqueRegions = [...new Set(data.map(entry => entry.region))].filter(region => region !== null);
            uniqueRegions.forEach(region => {
                const option = document.createElement('option');
                option.value = region;
                option.textContent = region;
                regionSelect.appendChild(option);
            });

            const pestleSelect = document.getElementById('pestle');
            const uniquePestles = [...new Set(data.map(entry => entry.pestle))].filter(pestle => pestle !== null);
            uniquePestles.forEach(pestle => {
                const option = document.createElement('option');
                option.value = pestle;
                option.textContent = pestle;
                pestleSelect.appendChild(option);
            });

            const sourceSelect = document.getElementById('source');
            const uniqueSources = [...new Set(data.map(entry => entry.source))].filter(source => source !== null);
            uniqueSources.forEach(source => {
                const option = document.createElement('option');
                option.value = source;
                option.textContent = source;
                sourceSelect.appendChild(option);
            });

            

        } catch (error) {
            console.error('Error:', error.message);
        }
    }