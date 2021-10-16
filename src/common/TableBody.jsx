import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

const TableBody = ({ items, columns, onLike, onDelete }) => {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };
  return (
    <tbody>
      {items.map((item) => (
        <tr key={item._id}>
          {columns.map((col) =>
            col.path === "title" ? (
              <td key={item._id}>
                <Link to={`/movies/${item._id}`}>{renderCell(item, col)}</Link>
              </td>
            ) : (
              <td key={item._id}>{renderCell(item, col)}</td>
            )
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
