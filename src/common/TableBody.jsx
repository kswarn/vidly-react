import React from "react";
import Like from "./Like";
import _ from "lodash";

const TableBody = (props) => {
  const { items, columns, onLike, onDelete } = props;

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };
  return (
    <tbody>
      {items.map((item) => (
        <tr key={item._id}>
          {columns.map((col) => (
            <td key={item._id}>{renderCell(item, col)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
