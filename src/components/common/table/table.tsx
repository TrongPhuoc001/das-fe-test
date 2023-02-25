import { useEffect, useState } from "react";
import { Customer } from "../../../models/customer";
import "./table.css";
import { TableRow } from "./tableRow";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
export interface TableProps {
  fields: any[];
  data: any[];
  title: string;
  onUpdate: (data: any) => void;
  onDelete: (data: any) => void;
  onCreate: (data: any) => void;
  customValidation?: (data: any) => string;
}

export const Table = ({
  fields,
  data,
  title,
  onUpdate,
  onDelete,
  onCreate,
  customValidation,
}: TableProps) => {
  const [newData, setNewData] = useState<any>({});
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [sortField, setSortField] = useState<any>({
    field: null,
    order: "desc",
    onFilter: false,
  });
  const [onExport, setOnExport] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    if (sortField.field === null) return;
    const sortedData = [...(sortField.onFilter ? filteredData : data)].sort(
      (a, b) => {
        if (a[sortField.field].toLowerCase() < b[sortField.field].toLowerCase())
          return -1;
        if (a[sortField.field].toLowerCase() > b[sortField.field].toLowerCase())
          return 1;
        return 0;
      }
    );
    if (sortField.order === "desc") sortedData.reverse();
    setFilteredData(sortedData);
  }, [sortField, data]);

  const handleFromChange = (e: any) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };
  const handleSearch = () => {
    const searchField = Object.keys(newData);
    const filteredData = data.filter((row) => {
      for (let i = 0; i < searchField.length; i++) {
        if (
          !row[searchField[i]]
            .toString()
            .toLowerCase()
            .includes(newData[searchField[i]]?.toString().toLowerCase())
        )
          return false;
      }
      return true;
    });

    setFilteredData(filteredData);
    setSortField({
      ...sortField,
      onFilter: true,
    });
  };
  return (
    <div className="table">
      <h2>{title} Table</h2>
      <div className="table-header">
        {fields.map((field) => (
          <b
            key={field.name}
            className="header-item"
            onClick={() => {
              if (field.name === sortField.field) {
                setSortField({
                  field: field.name,
                  order: sortField.order === "asc" ? "desc" : "asc",
                  onFilter: true,
                });
              } else {
                setSortField({
                  field: field.name,
                  order: "asc",
                  onFilter: true,
                });
              }
            }}
          >
            {field.name.charAt(0).toUpperCase() + field.name.slice(1)}{" "}
            {sortField.field === field.name && `(${sortField.order})`}
          </b>
        ))}
        <b className="header-item">Action</b>
      </div>
      <div className="table-content">
        {(sortField.onFilter ? filteredData : data).map((row) => (
          <TableRow
            key={row.id}
            row={row}
            fields={fields}
            onEdit={onUpdate}
            onDelete={onDelete}
            customValidation={customValidation}
          />
        ))}

        <form className="table-row form" onChange={handleFromChange}>
          <div className="table-data">
            {sortField.onFilter ? (
              <button
                className="action-button button-clear"
                onClick={() => {
                  setSortField({ field: null, order: "desc", onFilter: false });
                  setNewData({} as Customer);
                }}
              >
                Clear filter
              </button>
            ) : (
              <button
                className="action-button button-export"
                type="button"
                onClick={() => {
                  if (!onExport) {
                    const data: { [key: string]: any } = {};
                    fields.forEach((field) => {
                      data[field.name] = "on";
                    });
                    setNewData(data);
                  } else {
                    setNewData({});
                  }
                  setOnExport(!onExport);
                }}
              >
                {onExport ? "Cancel" : "Export"}
              </button>
            )}
          </div>
          {onExport ? (
            <>
              {fields.slice(1).map((field) => (
                <label
                  key={field.name + "formfield"}
                  className="table-data"
                  htmlFor={field.name}
                >
                  <input
                    type="checkbox"
                    name={field.name}
                    defaultChecked={newData[field.name]}
                    onChange={(e) => {
                      if (newData[e.target.name] === "on")
                        e.target.value = "off";
                      return e;
                    }}
                  />
                </label>
              ))}
              <div className="table-data">
                <button
                  className="action-button button-add"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    const selectedField = Object.keys(newData).filter(
                      (field) => newData[field] === "on"
                    );
                    const csvData = [
                      selectedField,
                      ...filteredData.map((row) => {
                        const data: any[] = [];
                        selectedField.forEach((field) => {
                          data.push(row[field]);
                        });
                        return data;
                      }),
                    ];
                    const ws = XLSX.utils.json_to_sheet(csvData);
                    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
                    const excelBuffer = XLSX.write(wb, {
                      bookType: "xlsx",
                      type: "array",
                    });
                    const data = new Blob([excelBuffer], {
                      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
                    });
                    FileSaver.saveAs(data, title + ".xlsx");
                  }}
                >
                  Excel
                </button>
                <button
                  className="action-button button-search"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    const doc = new jsPDF();
                    const selectedField = Object.keys(newData).filter(
                      (field) => newData[field] === "on"
                    );
                    doc.text(`${title} List`, 10, 10);
                    autoTable(doc, {
                      head: [selectedField],
                      body: filteredData.map((row) => {
                        const data: any[] = [];
                        selectedField.forEach((field) => {
                          data.push(row[field]);
                        });
                        return data;
                      }),
                    });

                    doc.save(`${title}.pdf`);
                  }}
                >
                  Pdf
                </button>
              </div>
            </>
          ) : (
            <>
              {fields.slice(1).map((field) => (
                <div key={field.name + "formfield"} className="table-data">
                  {field.exampleData.getDate ? (
                    <input
                      type="date"
                      name={field.name}
                      value={newData[field.name]}
                    />
                  ) : field.exampleData.map ? (
                    <select
                      name={field.name}
                      defaultChecked={newData[field.name]}
                      className="select"
                    >
                      <option value="">Select</option>
                      {field.exampleData.map((option: any) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      name={field.name}
                      value={newData[field.name]?.toString() || ""}
                    />
                  )}
                </div>
              ))}
              <div className="table-data">
                <button
                  className="action-button button-add"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();

                    for (let i = 1; i < fields.length; i++) {
                      if (!newData[fields[i].name]) {
                        setErrMessage(`${fields[i].name} is required`);
                        return;
                      }
                    }
                    if (customValidation) {
                      const err = customValidation(newData);
                      if (err) {
                        setErrMessage(err);
                        return;
                      }
                    }
                    setErrMessage("");

                    onCreate(newData);
                    setNewData({});
                  }}
                >
                  Add
                </button>
                <button
                  className="action-button button-search"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSearch();
                  }}
                >
                  Search
                </button>
                {errMessage ? (
                  <span className="err-message">{errMessage}</span>
                ) : null}
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
