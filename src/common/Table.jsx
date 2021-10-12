import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({ columns, sortColumn, onSort, onLike, items, onDelete }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody
        items={items}
        columns={columns}
        onLike={onLike}
        onDelete={onDelete}
      />
    </table>
  );
};

export default Table;
