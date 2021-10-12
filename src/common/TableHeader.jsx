import React from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const TableHeader = (props) => {
  const { columns, sortColumn, onSort } = props;
  const raiseSort = (path) => {
    const sortColumnClone = { ...sortColumn };
    if (path === sortColumnClone.path) {
      sortColumnClone.order = sortColumnClone.order === "asc" ? "desc" : "asc";
    } else {
      sortColumnClone.path = path;
      sortColumnClone.order = "asc";
    }

    onSort(sortColumnClone);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <ArrowUpwardIcon />;
    else return <ArrowDownwardIcon />;
  };
  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.path} onClick={() => raiseSort(col.path)}>
            {col.label} {renderSortIcon(col)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
