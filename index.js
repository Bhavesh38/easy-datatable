var scriptTagTailwind = document.createElement("script");
scriptTagTailwind.src = "https://cdn.tailwindcss.com";
document.head.appendChild(scriptTagTailwind);

var linkTag = document.createElement("link");
linkTag.rel = "stylesheet";
linkTag.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
linkTag.integrity =
    "sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==";
linkTag.crossOrigin = "anonymous";
linkTag.referrerPolicy = "no-referrer";
document.head.appendChild(linkTag);

const createDataTable = (
    tableId,
    tableHeadingId,
    plugins = { searching: false }
) => {
    let originalTableBody = null;
    let dataTableID = null;
    let table1_heading = null;
    let increasing = true;

    const filterAndSortTableBody = (tableBody, columnIndex, searchText) => {
        const rows = Array.from(originalTableBody.rows).map((row) =>
            row.cloneNode(true)
        );
        const filteredRows = rows.filter((row) => {
            for (let i = 0; i < row.cells.length; i++) {
                const cellContent = row.cells[i].textContent.trim().toLowerCase();
                if (cellContent.includes(searchText.toLowerCase())) {
                    return true;
                }
            }
            return false;
        });

        if (columnIndex !== -1) {
            filteredRows.sort((a, b) => {
                let cellA = a.cells[columnIndex].textContent.trim();
                let cellB = b.cells[columnIndex].textContent.trim();
                if (a.cells[columnIndex].hasAttribute("data-order")) {
                    cellA = a.cells[columnIndex].getAttribute("data-order").trim();
                }

                if (b.cells[columnIndex].hasAttribute("data-order")) {
                    cellB = b.cells[columnIndex].getAttribute("data-order").trim();
                }
                const valueA = parseFloat(cellA);
                const valueB = parseFloat(cellB);

                if (!isNaN(valueA) && !isNaN(valueB)) {
                    return valueA - valueB;
                } else {
                    return cellA.localeCompare(cellB);
                }
            });
        }

        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }
        filteredRows.forEach((row) => {
            tableBody.appendChild(row);
        });
    };

    function parseCellValue(cellValue) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (dateRegex.test(cellValue)) {
            // If the cell value matches the date format, parse it as a Date object
            return new Date(cellValue);
        } else {
            // If not a date, attempt to parse as a floating-point number
            return parseFloat(cellValue);
        }
    }
    const sortTableBodyDecreasing = (tableBody, columnIndex) => {
        const rows = Array.from(tableBody.rows);

        rows.sort((a, b) => {
            let cellA = a.cells[columnIndex].textContent.trim();
            let cellB = b.cells[columnIndex].textContent.trim();
            if (a.cells[columnIndex].hasAttribute("data-order")) {
                cellA = a.cells[columnIndex].getAttribute("data-order").trim();
            }

            if (b.cells[columnIndex].hasAttribute("data-order")) {
                cellB = b.cells[columnIndex].getAttribute("data-order").trim();
            }

            // If the values are numeric, sort in descending order
            // If the values are non-numeric, sort lexicographically
            const valueA = parseCellValue(cellA);
            const valueB = parseCellValue(cellB);

            if (valueA instanceof Date && valueB instanceof Date) {
                return valueB.getTime() - valueA.getTime();
            } else if (!isNaN(valueA) && !isNaN(valueB)) {
                return valueB - valueA;
            } else {
                return cellB.localeCompare(cellA);
            }
        });

        // Remove existing rows from the table
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }

        // Append the sorted rows back to the table
        rows.forEach((row) => {
            tableBody.appendChild(row);
        });
    };

    const sortTableBodyIncreasing = (tableBody, columnIndex) => {
        const rows = Array.from(tableBody.rows);

        rows.sort((a, b) => {
            let cellA = a.cells[columnIndex].textContent.trim();
            let cellB = b.cells[columnIndex].textContent.trim();
            if (a.cells[columnIndex].hasAttribute("data-order")) {
                cellA = a.cells[columnIndex].getAttribute("data-order").trim();
            }

            if (b.cells[columnIndex].hasAttribute("data-order")) {
                cellB = b.cells[columnIndex].getAttribute("data-order").trim();
            }

            const valueA = parseCellValue(cellA);
            const valueB = parseCellValue(cellB);

            if (valueA instanceof Date && valueB instanceof Date) {
                return valueA.getTime() - valueB.getTime();
            } else if (!isNaN(valueA) && !isNaN(valueB)) {
                return valueA - valueB;
            } else {
                return cellA.localeCompare(cellB);
            }
        });
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }

        rows.forEach((row) => {
            tableBody.appendChild(row);
        });
    };

    const changeIncreasingBtnColor = (cellIndex) => {
        if (table1_heading) {
            const cells = table1_heading.querySelectorAll("th");

            cells.forEach((cell, index) => {
                const icons = cell.querySelectorAll("i");
                icons[0].classList.remove("text-gray-200");
                icons[1].classList.remove("text-gray-200");
                if (index === cellIndex) {
                    icons[1].classList.add("text-gray-200");
                }
            });
        }
    };
    const changeDecreasingBtnColor = (cellIndex) => {
        if (table1_heading) {
            const cells = table1_heading.querySelectorAll("th");
            cells.forEach((cell, index) => {
                const icons = cell.querySelectorAll("i");
                icons[0].classList.remove("text-gray-200");
                icons[1].classList.remove("text-gray-200");
                if (index === cellIndex) {
                    icons[0].classList.add("text-gray-200");
                }
            });
        }
    };
    const rearrangeTable = (dataTableID, cellIndex) => {
        const tbody = dataTableID.querySelectorAll("tbody")[0];
        if (increasing) {
            sortTableBodyIncreasing(tbody, cellIndex);
            changeIncreasingBtnColor(cellIndex);
        } else {
            sortTableBodyDecreasing(tbody, cellIndex);
            changeDecreasingBtnColor(cellIndex);
        }
    };

    const addUpAndDownIconinThead = () => {
        const cells = table1_heading.querySelectorAll("th");
        if (cells) {
            cells.forEach((cell, index) => {
                const iconDiv = document.createElement("div");
                const upIcon = document.createElement("i");
                upIcon.classList.add("fa-solid", "fa-up-long", "text-gray-500");

                const downIcon = document.createElement("i");
                downIcon.classList.add("fa-solid", "fa-down-long", "text-gray-500");

                iconDiv.appendChild(downIcon);
                iconDiv.appendChild(upIcon);

                cell.appendChild(iconDiv);
                cell.classList.add("cursor-pointer");
            });
        }
    };
    const ffDataTable = (tableId, tableHeading, plugins) => {
        dataTableID = document.getElementById(tableId);
        table1_heading = document.getElementById(tableHeading);
        if (dataTableID) {
            const tbody = dataTableID.querySelectorAll("tbody")[0];
            originalTableBody = tbody.cloneNode(true);
            if (table1_heading) {
                addUpAndDownIconinThead(table1_heading);
                table1_heading.addEventListener("click", (event) => {
                    let cell = event.target.tagName;
                    cellIndex = -1;
                    if (cell.toLowerCase() === "th" || cell.toLowerCase() === "td") {
                        cellIndex = event.target.cellIndex;
                        rearrangeTable(dataTableID, cellIndex);
                        increasing = !increasing;
                    }
                });
            } else {
                console.error("Element with ID not found.");
            }

            dataTableID.classList.add("relative", "mt-12");
            const newSearchBox = document.createElement("div");
            newSearchBox.classList.add("absolute", "-top-12", "right-0");
            newSearchBox.innerHTML = "<label>Search: </label><input id='datatableSearchInput'  type='text' class='outline-none border-[1px] border-gray-300 rounded p-1 focus:border-blue-500'/>";
            if (plugins.searching) {
                dataTableID.appendChild(newSearchBox);
            }

            //   properties
            const searchInput = newSearchBox.querySelector("input");
            searchInput.addEventListener("input", function () {
                if (searchInput.value.length === 0) {
                    filterAndSortTableBody(
                        dataTableID.querySelectorAll("tbody")[0],
                        -1,
                        ""
                    );
                } else {
                    filterAndSortTableBody(
                        dataTableID.querySelectorAll("tbody")[0],
                        -1,
                        searchInput.value
                    );
                }
            });
        } else {
            console.log("Table doesn't exist.");
        }
    };
    const initializeDataTable = () => {
        ffDataTable(tableId, tableHeadingId, plugins);
    };
    return {
        initializeDataTable,
    };
};