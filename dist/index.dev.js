"use strict";

// import { upIcon, downIcon } from "./assest/icons";
var createDataTable = function createDataTable(tableId) {
  var plugins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    searching: false
  };
  var originalTableBody = [];
  var dataTableID = null;
  var dataTableHeading = null;
  var increasing = true;

  var filterAndSortTableBody = function filterAndSortTableBody(tableBody, columnIndex, searchText) {
    var rows = Array.from(originalTableBody.rows).map(function (row) {
      return row.cloneNode(true);
    });
    var filteredRows = rows.filter(function (row) {
      for (var i = 0; i < row.cells.length; i++) {
        var cellContent = row.cells[i].textContent.trim().toLowerCase();

        if (cellContent.includes(searchText.toLowerCase())) {
          return true;
        }
      }

      return false;
    });

    if (columnIndex !== -1) {
      filteredRows.sort(function (a, b) {
        var cellA = a.cells[columnIndex].textContent.trim();
        var cellB = b.cells[columnIndex].textContent.trim();

        if (a.cells[columnIndex].hasAttribute("data-order")) {
          cellA = a.cells[columnIndex].getAttribute("data-order").trim();
        }

        if (b.cells[columnIndex].hasAttribute("data-order")) {
          cellB = b.cells[columnIndex].getAttribute("data-order").trim();
        }

        var valueA = parseFloat(cellA);
        var valueB = parseFloat(cellB);

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

    filteredRows.forEach(function (row) {
      tableBody.appendChild(row);
    });
  };

  function parseCellValue(cellValue) {
    var dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (dateRegex.test(cellValue)) {
      // If the cell value matches the date format, parse it as a Date object
      return new Date(cellValue);
    } else {
      // If not a date, attempt to parse as a floating-point number
      return parseFloat(cellValue);
    }
  }

  var sortTableBodyDecreasing = function sortTableBodyDecreasing(columnIndex) {
    var rows = [];
    originalTableBody.forEach(function (row) {
      return rows.push(row.cloneNode(true));
    });
    rows.sort(function (a, b) {
      var cellA = a.cells[columnIndex].textContent.trim();
      var cellB = b.cells[columnIndex].textContent.trim();

      if (a.cells[columnIndex].hasAttribute("data-order")) {
        cellA = a.cells[columnIndex].getAttribute("data-order").trim();
      }

      if (b.cells[columnIndex].hasAttribute("data-order")) {
        cellB = b.cells[columnIndex].getAttribute("data-order").trim();
      }

      var valueA = parseCellValue(cellA);
      var valueB = parseCellValue(cellB);

      if (valueA instanceof Date && valueB instanceof Date) {
        return valueB.getTime() - valueA.getTime();
      } else if (!isNaN(valueA) && !isNaN(valueB)) {
        return valueB - valueA;
      } else {
        return cellB.localeCompare(cellA);
      }
    });
    var curr_table = document.getElementById(dataTableID);
    var number_of_rows = curr_table.rows.length;

    for (var i = number_of_rows - 1; i > 0; i--) {
      curr_table.deleteRow(i);
    }

    var table_body = curr_table.querySelectorAll('tbody')[0];
    rows.forEach(function (row) {
      table_body.appendChild(row);
    });
  };

  var sortTableBodyIncreasing = function sortTableBodyIncreasing(columnIndex) {
    var rows = [];
    originalTableBody.forEach(function (row) {
      return rows.push(row.cloneNode(true));
    });
    rows.sort(function (a, b) {
      var cellA = a.cells[columnIndex].textContent.trim();
      var cellB = b.cells[columnIndex].textContent.trim();

      if (a.cells[columnIndex].hasAttribute("data-order")) {
        cellA = a.cells[columnIndex].getAttribute("data-order").trim();
      }

      if (b.cells[columnIndex].hasAttribute("data-order")) {
        cellB = b.cells[columnIndex].getAttribute("data-order").trim();
      }

      var valueA = parseCellValue(cellA);
      var valueB = parseCellValue(cellB);

      if (valueA instanceof Date && valueB instanceof Date) {
        return valueA.getTime() - valueB.getTime();
      } else if (!isNaN(valueA) && !isNaN(valueB)) {
        return valueA - valueB;
      } else {
        return cellA.localeCompare(cellB);
      }
    });
    var curr_table = document.getElementById(dataTableID);
    var number_of_rows = curr_table.rows.length;

    for (var i = number_of_rows - 1; i > 0; i--) {
      curr_table.deleteRow(i);
    }

    var table_body = curr_table.querySelectorAll('tbody')[0];
    rows.forEach(function (row) {
      table_body.appendChild(row);
    });
  };

  var changeIncreasingBtnColor = function changeIncreasingBtnColor(cellIndex) {
    if (dataTableID) {
      var cells = dataTableHeading.querySelectorAll("th");

      if (cells.length === 0) {
        cells = dataTableHeading.querySelectorAll("td");
      }

      cells.forEach(function (cell, index) {
        var icons = cell.querySelectorAll("span");
        icons[0].style.display = "none";
        icons[1].style.display = "none";

        if (index === cellIndex) {
          icons[0].style.display = "contents";
        }
      });
    }
  };

  var changeDecreasingBtnColor = function changeDecreasingBtnColor(cellIndex) {
    if (dataTableID) {
      var cells = dataTableHeading.querySelectorAll("th");

      if (cells.length === 0) {
        cells = dataTableHeading.querySelectorAll("td");
      }

      cells.forEach(function (cell, index) {
        var icons = cell.querySelectorAll("span");
        icons[0].style.display = "none";
        icons[1].style.display = "none";

        if (index === cellIndex) {
          icons[1].style.display = "contents";
        }
      });
    }
  };

  var rearrangeTable = function rearrangeTable(dataTableID, cellIndex) {
    if (increasing) {
      sortTableBodyIncreasing(cellIndex);
      changeIncreasingBtnColor(cellIndex);
    } else {
      sortTableBodyDecreasing(cellIndex);
      changeDecreasingBtnColor(cellIndex);
    }
  };

  var addUpAndDownIconinThead = function addUpAndDownIconinThead() {
    var cells = dataTableHeading.querySelectorAll("th");

    if (cells.length === 0) {
      cells = dataTableHeading.querySelectorAll("td");
    }

    if (cells.length > 0) {
      cells.forEach(function (cell, index) {
        var iconDiv = document.createElement("div");
        iconDiv.classList.add("dt_icon_div");
        iconDiv.style.display = "flex";
        var upIcon = document.createElement("span");
        upIcon.classList.add("dt_upicon");
        upIcon.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" fill=\"#000000\" height=\"8px\" width=\"8px\" version=\"1.1\" id=\"Layer_1\" viewBox=\"0 0 512 512\" enable-background=\"new 0 0 512 512\" xml:space=\"preserve\">\n                <polygon points=\"245,0 74.3,213.3 202.3,213.3 202.3,512 287.7,512 287.7,213.3 415.7,213.3 \" />\n            </svg>";
        var downIcon = document.createElement("span");
        downIcon.classList.add("dt_downicon");
        downIcon.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" fill=\"#000000\" height=\"8px\" width=\"8px\" version=\"1.1\" id=\"Layer_1\" viewBox=\"0 0 512 512\" enable-background=\"new 0 0 512 512\" xml:space=\"preserve\">\n                <polygon points=\"283.7,298.7 283.7,0 198.3,0 198.3,298.7 70.3,298.7 241,512 411.7,298.7 \" />\n            </svg>";
        iconDiv.appendChild(downIcon);
        iconDiv.appendChild(upIcon);
        cell.appendChild(iconDiv);
        cell.style.cursor = "pointer";
      });
    }
  };

  var selectHeader = function selectHeader(id) {
    dataTableHeading = document.getElementById(id).querySelectorAll('tr')[0];
  };

  var DataTableInitialFunction = function DataTableInitialFunction(tableId, plugins) {
    dataTableID = tableId;
    selectHeader(tableId);

    if (dataTableID) {
      var tbodyRows = document.getElementById(dataTableID).querySelectorAll("tr");
      tbodyRows.forEach(function (row, index) {
        if (index === 0) {
          return;
        }

        originalTableBody.push(row.cloneNode(true));
      });

      if (dataTableHeading) {
        addUpAndDownIconinThead();
        dataTableHeading.addEventListener("click", function (event) {
          var cell = event.target.tagName;
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

      var curr_table = document.getElementById(dataTableID);
      curr_table.classList.add("data-table");
      curr_table.style = {
        position: "absolute"
      };
      var newSearchBox = document.createElement("div");
      newSearchBox.classList.add("data-table-search-box");
      newSearchBox.style = {
        position: "absolute",
        top: "0",
        right: "0"
      };
      newSearchBox.innerHTML = "<label>Search: </label><input id='datatableSearchInput'  type='text' class='outline-none border-[1px] border-gray-300 rounded p-1 focus:border-blue-500'/>";

      if (plugins.searching) {
        curr_table.appendChild(newSearchBox);
      } // properties
      // const searchInput = newSearchBox.querySelector("input");
      // searchInput.addEventListener("input", function () {
      //     if (searchInput.value.length === 0) {
      //         filterAndSortTableBody(
      //             originalTableBody,
      //             -1,
      //             ""
      //         );
      //     } else {
      //         filterAndSortTableBody(
      //             originalTableBody,
      //             -1,
      //             searchInput.value
      //         );
      //     }
      // });

    } else {
      console.log("Table doesn't exist.");
    }
  };

  var initializeDataTable = function initializeDataTable() {
    DataTableInitialFunction(tableId, plugins);
  };

  return {
    initializeDataTable: initializeDataTable
  };
};

module.exports = createDataTable;