import React from "react";

//Input: array of column, sortColumn:object, onSort:function
const TableHeader = (props) => {
  const { sortColumn, columns } = props;

  const raiseSort = (path) => {
    const sortColumn = { ...props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    props.onSort(sortColumn);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === "asc") {
      return <i className="fa fa-sort-asc" />;
    } else {
      return <i className="fa fa-sort-desc" />;
    }
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            style={{ cursor: "pointer" }}
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
