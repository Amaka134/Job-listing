fetch("data.json")
.then(response => response.json())
.then(data => {
  document.querySelector(".job-logo img")
.src = data.imagePath;
  
})
document.addEventListener("DOMContentLoaded", () => {
    const jobCards = document.querySelectorAll(".job-card");
    const filterContainer = document.createElement("div");
    filterContainer.classList.add("filter-container");
    document.body.insertBefore(filterContainer, document.querySelector(".job-container"));

    let selectedFilters = [];

    // Function to filter job listings
    function filterJobs() {
        jobCards.forEach(card => {
            const role = card.getAttribute("data-role");
            const level = card.getAttribute("data-level");
            const languages = card.getAttribute("data-languages").split(" ");
            const tools = card.getAttribute("data-tools").split(" ");

            // Check if the job matches all selected filters
            const matchesFilters = selectedFilters.every(filter =>
                role === filter ||
                level === filter ||
                languages.includes(filter) ||
                tools.includes(filter)
            );

            card.style.display = matchesFilters || selectedFilters.length === 0 ? "flex" : "none";
        });
    }

    // Function to create filter buttons
    function addFilter(tagText) {
        if (!selectedFilters.includes(tagText)) {
            selectedFilters.push(tagText);
            updateFilterUI();
            filterJobs();
        }
    }

    // Function to update filter UI
    function updateFilterUI() {
        filterContainer.innerHTML = "";

        selectedFilters.forEach(filter => {
            const filterTag = document.createElement("span");
            filterTag.classList.add("filter-tag");
            filterTag.textContent = filter;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "x";
            removeBtn.classList.add("remove-filter");
            removeBtn.addEventListener("click", () => removeFilter(filter));

            filterTag.appendChild(removeBtn);
            filterContainer.appendChild(filterTag);
        });

        // Add a "Clear All" button
        if (selectedFilters.length > 0) {
            const clearBtn = document.createElement("button");
            clearBtn.textContent = "Clear";
            clearBtn.classList.add("clear-filters");
            clearBtn.addEventListener("click", clearFilters);
            filterContainer.appendChild(clearBtn);
        }
    }

    // Function to remove a specific filter
    function removeFilter(filter) {
        selectedFilters = selectedFilters.filter(f => f !== filter);
        updateFilterUI();
        filterJobs();
    }

    // Function to clear all filters
    function clearFilters() {
        selectedFilters = [];
        updateFilterUI();
        filterJobs();
    }

    // Attach event listeners to job tags
    document.querySelectorAll(".tag").forEach(tag => {
        tag.addEventListener("click", () => addFilter(tag.textContent));
    });
});