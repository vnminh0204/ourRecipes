import React from "react";
import _ from "lodash";

const TableBody = (props) => {
  const { data, columns, valueProperty } = props;

  const renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    } else {
      return _.get(item, column.path);
    }
  };

  const createKey = (item, column) => {
    return item[valueProperty] + (column.path || column.key);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item[valueProperty]}>
          {columns.map((column) => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.defaultProps = {
  valueProperty: "id",
};

export default TableBody;
