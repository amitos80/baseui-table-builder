import React, { useState } from "react";
import { Table, TableBuilderColumn } from "baseui/table-semantic";
// import {
//   Table,

// } from "baseui/table";

import { Input, SIZE as INPUT_SIZE } from "baseui/input";
//import { ArrowUp, ArrowDown } from "baseui/icon";
import { LabelLarge } from "baseui/typography";

type Row = {
  id: number;
  name: string;
  email: string;
  age: number;
};

type Column = {
  id: string;
  header: string;
};

const rows: Row[] = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 25 },
  { id: 2, name: "Jane Doe", email: "jane@example.com", age: 30 },
  { id: 3, name: "Bob Smith", email: "bob@example.com", age: 20 }
];

const columns: Column[] = [
  { id: "name", header: "Name" },
  { id: "email", header: "Email" },
  { id: "age", header: "Age" }
];

const EnhancedTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortAscending, setSortAscending] = useState(true);

  // Example data

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // const handleSort = (id: number) => {
  //   if (sortColumn && sortColumn === String(id)) {
  //     setSortAscending(!sortAscending);
  //   } else {
  //     setSortColumn(String(id));
  //     setSortAscending(true);
  //   }
  // };

  const filteredRows = rows.filter((row) => {
    return Object.values(row).some((value) => {
      return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  const sortedRows = [...filteredRows].sort((a: Row, b: Row) => {
    if (sortColumn) {
      const comparison =
        a[sortColumn as keyof Row] > b[sortColumn as keyof Row] ? 1 : -1;
      return sortAscending ? comparison : -comparison;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <LabelLarge>Search:</LabelLarge>
      <Input
        value={searchTerm}
        onChange={(e: any) => handleSearch(e)}
        size={INPUT_SIZE.compact}
      />
      <Table<Row>
        columns={columns.map((c) => c.header)}
        data={sortedRows.map((r) => Object.keys(r).map((key) => r[key]))}
      >
        {columns.map((column, index) => (
          <TableBuilderColumn<Row>
            key={column.id}
            id={column.id}
            header={column.header}
            //sort={column.id}
          >
            {(row: any) => <div>{row[column.id]}</div>}
          </TableBuilderColumn>
        ))}
      </Table>
    </div>
  );
};

export default EnhancedTable;
