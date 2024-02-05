# easy-datatable

[![npm version](https://img.shields.io/npm/v/easy-datatable.svg)](https://www.npmjs.com/package/easy-datatable)
[![License](https://img.shields.io/npm/l/easy-datatable.svg)](https://opensource.org/licenses/MIT)

> A lightweight and customizable data table library for easy sorting, searching, and more.

## Table of Contents

- [easy-datatable](#easy-datatable)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
- [Basic usage](#basic-usage)
- [Sorting with Data-Order](#sorting-with-data-order)
- [Plugins](#plugins)
  - [Examples](#examples)

## Installation

Install the library via npm:

```bash
npm install easy-datatable

## Usage

# Basic usage

    const dataTable = createDataTable('your_table_id');
    dataTable.initializeDataTable();

# Sorting with Data-Order

define data-order as an attribute in td to use another value insted of textContent for sorting.

# Plugins

    const plugins={searching:true,copyCellText:true}
    const dataTable = createDataTable('your_table_id',plugins);
    dataTable.initializeDataTable();

    It will enable searching and copying functionlities.

## Examples

    <table id='table'>
        <thead>
            <tr id='head' style='background-color:#000;'>
                <th>Id</th>
                <th>Name</th>
                <th>Age</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>John</td>
                <td>25</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Smith</td>
                <td>30</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Harry</td>
                <td>35</td>
            </tr>
            <tr>
                <td>4</td>
                <td>Tom</td>
                <td>40</td>
            </tr>
        </tbody>
    </table>

    const dataTable = createDataTable('table', { searching: true, copyCellText: true });
    dataTable.initializeDataTable();

![Example](https://i.ibb.co/F7DvsTw/Screenshot-2024-02-06-000420.png)
```
