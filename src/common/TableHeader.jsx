import React from "react";

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
  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.path} onClick={() => raiseSort(col.path)}>
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
