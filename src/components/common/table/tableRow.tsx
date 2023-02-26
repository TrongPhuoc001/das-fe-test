import { useState } from "react";

export const TableRow = ({
  row,
  fields,
  onEdit,
  onDelete,
  customValidation,
}: {
  row: any;
  fields: any[];
  onEdit: (data: any) => void;
  onDelete: (data: string) => void;
  customValidation?: (data: any) => string;
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<any>(row);
  const [errMessage, setErrMessage] = useState<string>("");

  const handleEditFormChange = (e: any) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };
  return isEdit ? (
    <form className="table-row form" onChange={handleEditFormChange}>
      <div className="table-data">{row["id"]}</div>
      {fields.slice(1).map((field) => (
        <div key={field.name + "formfield"} className="table-data">
          {field.exampleData.getDate ? (
            <input
              type="date"
              name={field.name}
              defaultValue={
                updateData[field.name]?.toString().split("T")[0] || ""
              }
            />
          ) : field.exampleData.map ? (
            <select
              name={field.name}
              defaultChecked={updateData[field.name]}
              className="select"
            >
              {field.exampleData.map((option: any) => (
                <option
                  key={option}
                  value={option}
                  selected={option === updateData[field.name]}
                >
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              name={field.name}
              defaultValue={updateData[field.name]?.toString() || ""}
            />
          )}
        </div>
      ))}
      <div className="table-data">
        <button
          className="action-button button-edit"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            for (let i = 1; i < fields.length; i++) {
              if (!updateData[fields[i].name]) {
                setErrMessage(`${fields[i].name} is required`);
                return;
              }
            }
            if (customValidation) {
              const err = customValidation(updateData);
              if (err) {
                setErrMessage(err);
                return;
              }
            }
            setErrMessage("");
            onEdit(updateData);
            setIsEdit(false);
          }}
        >
          Save
        </button>
        <button
          className="action-button button-delete"
          onClick={() => {
            setIsEdit(false);
          }}
        >
          Cancel
        </button>
        {errMessage ? <span className="err-message">{errMessage}</span> : null}
      </div>
    </form>
  ) : (
    <div key={updateData["id"]} className="table-row">
      {fields.map((field, index) => (
        <div
          key={updateData[field.name] + fields[index].name}
          className="table-data"
        >
          {updateData[field.name].toString()}
        </div>
      ))}
      <div className="table-data">
        <button
          className="action-button button-edit"
          onClick={() => {
            setIsEdit(true);
          }}
        >
          Edit
        </button>
        <button
          className="action-button button-delete"
          onClick={() => {
            onDelete(updateData.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
