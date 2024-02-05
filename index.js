// import { upIcon, downIcon } from "./assest/icons";

const createDataTable = (
    tableId,
    plugins = null
) => {
    let originalTableBody = [];
    let initialTableHeadData = [];
    let dataTableID = null;
    let dataTableHeading = null;
    let increasing = true;

    const filterAndSortTableBody = (tableBody, columnIndex, searchText) => {
        const rows = [];
        originalTableBody.forEach((row) => rows.push(row.cloneNode(true)));
        const filteredRows = rows.filter((row) => {
            for (let i = 0; i < row.cells.length; i++) {
                const cellContent = row.cells[i].textContent.trim().toLowerCase();
                if (cellContent.includes(searchText.toLowerCase())) {
                    return true;
                }
            }
            return false;
        });

        // if (columnIndex !== -1) {
        //     filteredRows.sort((a, b) => {
        //         let cellA = a.cells[columnIndex].textContent.trim();
        //         let cellB = b.cells[columnIndex].textContent.trim();
        //         if (a.cells[columnIndex].hasAttribute("data-order")) {
        //             cellA = a.cells[columnIndex].getAttribute("data-order").trim();
        //         }

        //         if (b.cells[columnIndex].hasAttribute("data-order")) {
        //             cellB = b.cells[columnIndex].getAttribute("data-order").trim();
        //         }
        //         const valueA = parseFloat(cellA);
        //         const valueB = parseFloat(cellB);

        //         if (!isNaN(valueA) && !isNaN(valueB)) {
        //             return valueA - valueB;
        //         } else {
        //             return cellA.localeCompare(cellB);
        //         }
        //     });
        // }

        deleteAllRows();
        rowsInTable(filteredRows);

    };

    const deleteAllRows = () => {
        const curr_table = document.getElementById(dataTableID);
        const number_of_rows = curr_table.rows.length;
        for (let i = number_of_rows - 1; i > 0; i--) {
            curr_table.deleteRow(i);
        }
    }

    const rowsInTable = (rowsToAdd) => {
        const curr_table = document.getElementById(dataTableID);
        const table_body = curr_table.querySelectorAll('tbody')[0];
        rowsToAdd.forEach((row) => {
            table_body.appendChild(row);
        });
    }

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

    const getCurrentRows = () => {
        const temp_rows = [];
        const tbodyRows = document.getElementById(dataTableID).querySelectorAll("tr");
        tbodyRows.forEach((row, index) => {
            if (index === 0) {
                return;
            }
            temp_rows.push(row.cloneNode(true));
        });
        return temp_rows;
    }
    const sortTableBodyDecreasing = (columnIndex) => {
        const rows = [];
        const current_rows = getCurrentRows();
        current_rows.forEach((row) => rows.push(row.cloneNode(true)));

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
                return valueB.getTime() - valueA.getTime();
            } else if (!isNaN(valueA) && !isNaN(valueB)) {
                return valueB - valueA;
            } else {
                return cellB.localeCompare(cellA);
            }
        });

        deleteAllRows();
        rowsInTable(rows);
    };

    const sortTableBodyIncreasing = (columnIndex) => {
        const rows = [];
        const current_rows = getCurrentRows();
        current_rows.forEach((row) => rows.push(row.cloneNode(true)));
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
        const curr_table = document.getElementById(dataTableID);
        deleteAllRows();
        rowsInTable(rows);
    };

    const changeIncreasingBtnColor = (cellIndex) => {
        if (dataTableID) {
            let cells = dataTableHeading.querySelectorAll("th");
            if (cells.length === 0) {
                cells = dataTableHeading.querySelectorAll("td");
            }
            cells.forEach((cell, index) => {
                const icons = cell.querySelectorAll("span");
                icons[0].style.display = "none";
                icons[1].style.display = "none";
                if (index === cellIndex) {
                    icons[0].style.display = "contents";
                }
            });
        }
    };
    const changeDecreasingBtnColor = (cellIndex) => {
        if (dataTableID) {
            let cells = dataTableHeading.querySelectorAll("th");
            if (cells.length === 0) {
                cells = dataTableHeading.querySelectorAll("td");
            }
            cells.forEach((cell, index) => {
                const icons = cell.querySelectorAll("span");
                icons[0].style.display = "none";
                icons[1].style.display = "none";
                if (index === cellIndex) {
                    icons[1].style.display = "contents";
                }
            });
        }
    };
    const rearrangeTable = (dataTableID, cellIndex) => {
        if (increasing) {
            sortTableBodyIncreasing(cellIndex);
            changeIncreasingBtnColor(cellIndex);
        } else {
            sortTableBodyDecreasing(cellIndex);
            changeDecreasingBtnColor(cellIndex);
        }
    };

    const addUpAndDownIconinThead = () => {
        let cells = dataTableHeading.querySelectorAll("th");
        if (cells.length === 0) {
            cells = dataTableHeading.querySelectorAll("td");
        }

        if (cells.length > 0) {
            cells.forEach((cell, index) => {
                const iconDiv = document.createElement("div");
                iconDiv.classList.add("dt_icon_div");
                iconDiv.style.display = "flex";
                const upIcon = document.createElement("span");
                upIcon.classList.add("dt_upicon");
                upIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="8px" width="8px" version="1.1" id="Layer_1" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                <polygon points="245,0 74.3,213.3 202.3,213.3 202.3,512 287.7,512 287.7,213.3 415.7,213.3 " />
            </svg>`;
                const downIcon = document.createElement("span");
                downIcon.classList.add("dt_downicon");
                downIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="8px" width="8px" version="1.1" id="Layer_1" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                <polygon points="283.7,298.7 283.7,0 198.3,0 198.3,298.7 70.3,298.7 241,512 411.7,298.7 " />
            </svg>`;

                iconDiv.appendChild(downIcon);
                iconDiv.appendChild(upIcon);

                cell.appendChild(iconDiv);
                cell.style.cursor = "pointer";
            });
        }
    };
    const selectHeader = (id) => {
        dataTableHeading = document.getElementById(id).querySelectorAll('tr')[0];
    }

    const enableSearchPlugin = () => {
        const curr_table = document.getElementById(dataTableID);
        curr_table.style.marginTop = "32px";
        // curr_table.classList.add("data-table");
        curr_table.style.position = "relative";
        const newSearchBox = document.createElement("div");
        newSearchBox.classList.add("data-table-search-box");
        newSearchBox.style.position = "absolute";
        newSearchBox.style.top = "-28px";
        newSearchBox.style.right = "0";
        newSearchBox.innerHTML = "<label>Search: </label><input id='datatableSearchInput'  type='text' style='outline:none; border:1px solid gray; border-radius:4px; padding:4px 8px;'/>";
        curr_table.appendChild(newSearchBox);
        // properties
        const searchInput = document.getElementById('datatableSearchInput')
        if (searchInput) {
            searchInput.addEventListener("input", function () {
                if (searchInput.value.length === 0) {
                    filterAndSortTableBody(
                        originalTableBody,
                        -1,
                        ""
                    );
                } else {
                    filterAndSortTableBody(
                        originalTableBody,
                        -1,
                        searchInput.value
                    );
                }
            });
        }
    }


    const enableCopyCellPlugin = () => {
        const curr_table = document.getElementById(dataTableID);
        curr_table.style.marginBottom = "32px";
        // curr_table.classList.add("data-table");
        curr_table.style.position = "relative";
        const newSearchBox = document.createElement("div");
        newSearchBox.classList.add("data-table-copy-cell-box");
        newSearchBox.style.position = "absolute";
        newSearchBox.style.bottom = "-28px";
        newSearchBox.style.right = "0";
        newSearchBox.innerHTML = "<select style='outline:none; border:1px solid gray; border-radius:2px; padding:4px 8px; margin-right:4px;cursor:pointer;' id='select_copy_type'><option value='col' selected>Copy Col</option></select><input id='select_copy_type_input'  type='number' style='outline:none; border:1px solid gray; border-radius:4px; padding:4px 8px;max-width:60px;'/><button type='button' id='copy_cells_btn' style='margin-left:4px;padding:3px 8px;cursor:pointer;'>Copy</button>";
        curr_table.appendChild(newSearchBox);

        const copy_cells_btn = document.getElementById('copy_cells_btn');
        if (copy_cells_btn) {
            copy_cells_btn.addEventListener('click', async () => {
                const type_val = document.getElementById('select_copy_type').value;
                let input_val = parseInt(document.getElementById('select_copy_type_input').value);


                if (isNaN(input_val)) {
                    alert('Enter valid argument.');
                    return;
                }
                const curr_table = document.getElementById(dataTableID);
                const currentRows = curr_table.querySelectorAll('tr');
                const totalCells = currentRows[0].cells
                if (input_val >= totalCells.length || input_val < 0) {
                    alert('Enter valid argument.');
                    return;
                }

                let copyText = '';
                currentRows.forEach((row, index) => {
                    let textContent = row.querySelectorAll('td')[input_val]?.textContent;
                    if (!textContent) {
                        textContent = row.querySelectorAll('th')[input_val].textContent;
                    }
                    copyText += `${textContent}\n`;
                });

                var textarea = document.createElement("textarea");
                textarea.value = copyText;
                document.body.appendChild(textarea);
                textarea.select();
                textarea.setSelectionRange(0, 99999);
                document.execCommand("copy");
                document.body.removeChild(textarea);
                console.log('text Copied to clipboard.');
            });
        }
    }
    const copyDataTableHeadingData = () => {

        let tableCells = dataTableHeading.querySelectorAll("th");
        if (tableCells.length === 0) {
            tableCells = dataTableHeading.querySelectorAll("td");
        }
        tableCells.forEach((cell) => {
            initialTableHeadData.push(cell.textContent);
        });
    }
    const DataTableInitialFunction = (tableId, plugins) => {
        dataTableID = tableId;
        selectHeader(tableId);
        if (dataTableID) {
            const tbodyRows = document.getElementById(dataTableID).querySelectorAll("tr");
            tbodyRows.forEach((row, index) => {
                if (index === 0) {
                    return;
                }
                originalTableBody.push(row.cloneNode(true));
            });

            if (dataTableHeading) {
                copyDataTableHeadingData();
                addUpAndDownIconinThead();
                dataTableHeading.addEventListener("click", (event) => {
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
                return;
            }

            if (plugins?.searching) {
                //enable searching functionlities
                enableSearchPlugin();
            }


            if (plugins?.copyCellText) {
                //enable copycell functionlities
                enableCopyCellPlugin();
            }

            console.log(plugins);
        } else {
            console.log("Table doesn't exist.");
        }
    };
    const initializeDataTable = () => {
        DataTableInitialFunction(tableId, plugins);
    };
    return {
        initializeDataTable,
    };
};

module.exports = createDataTable;