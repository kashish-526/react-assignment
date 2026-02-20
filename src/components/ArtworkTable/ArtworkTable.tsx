// src/components/ArtworkTable.tsx

// React aur hooks import kar rahe hain
import React, { useRef, useState } from "react";

// PrimeReact ke components import kar rahe hain
import { DataTable, type DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";

// Artwork type import kar rahe hain (TypeScript model)
import type { Artwork } from "@src/models/artwork";

// Component ke props ka interface define kar rahe hain
interface ArtworkTableProps {
  data: Artwork[]; // Table me dikhane wala data
  loading: boolean; // Loader show karna hai ya nahi
  totalRecords: number; // Total records (pagination ke liye)
  first: number; // Current page ka starting index
  rows: number; // Har page me kitne rows dikhane hain
  selectedRows: Artwork[]; // Selected rows ka data
  onSelectionChange: (rows: Artwork[]) => void; // Selection change handler
  onPage: (event: DataTablePageEvent) => void; // Pagination handler
}

// Functional component start
const ArtworkTable: React.FC<ArtworkTableProps> = ({
  data,
  loading,
  totalRecords,
  first,
  rows,
  selectedRows,
  onSelectionChange,
  onPage,
}) => {
  // OverlayPanel ka reference banaya (open/close control karne ke liye)
  const overlayRef = useRef<OverlayPanel>(null);

  // Custom select ke liye number store karne ka state
  const [customCount, setCustomCount] = useState(1);

  // Custom select button click hone par chalega
  const onCustomSelect = () => {
    // Data ke first n rows select kar rahe hain
    const selected = data.slice(0, customCount);

    // Parent component ko selected rows bhej rahe hain
    onSelectionChange(selected);

    // Overlay panel band kar rahe hain
    overlayRef.current?.hide();
  };

  return (
    <div className="card">
      {/* Button jo overlay panel ko toggle karega */}
      <Button
        type="button"
        label="Custom Select Rows"
        icon="pi pi-plus"
        className="mb-3"
        onClick={(e) => overlayRef.current?.toggle(e)}
      />

      {/* Overlay Panel (Popup) */}
      <OverlayPanel ref={overlayRef}>
        <div className="p-d-flex p-flex-column p-ai-start p-m-2">
          {/* Label */}
          <label>Select first n rows:</label>

          {/* Number input jisme user count dalega */}
          <input
            type="number"
            value={customCount}
            onChange={(e) => setCustomCount(Number(e.target.value))}
            className="p-inputtext p-mb-2"
            min={1}
            max={data.length}
          />

          {/* Select button */}
          <Button label="Select" onClick={onCustomSelect} />
        </div>
      </OverlayPanel>

      {/* DataTable Component */}
      <DataTable
        value={data} // Table ka data
        paginator // Pagination enable
        first={first} // Current page start index
        rows={rows} // Rows per page
        lazy // Server-side pagination indicate karta hai
        totalRecords={totalRecords} // Total records (pagination ke liye important)
        onPage={onPage} // Page change event handler
        loading={loading} // Loading spinner show karega
        selection={selectedRows} // Selected rows bind kar rahe hain
        onSelectionChange={(e) => onSelectionChange(e.value)} // Selection change
        selectionMode="checkbox" // Checkbox selection enable
        dataKey="id" // Unique key har row ke liye
        stripedRows // Alternate row color
        showGridlines // Table me grid lines
        tableStyle={{ minWidth: "50rem" }} // Minimum width set
      >
        {/* Checkbox column */}
        <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />

        {/* Normal data columns */}
        <Column field="title" header="Title" sortable style={{ width: "20%" }} />
        <Column
          field="place_of_origin"
          header="Place of Origin"
          sortable
          style={{ width: "15%" }}
        />
        <Column field="artist_display" header="Artist" style={{ width: "20%" }} />
        <Column field="inscriptions" header="Inscriptions" style={{ width: "15%" }} />
        <Column field="date_start" header="Start Date" sortable style={{ width: "15%" }} />
        <Column field="date_end" header="End Date" sortable style={{ width: "15%" }} />
      </DataTable>
    </div>
  );
};

// Component export kar rahe hain
export default ArtworkTable;