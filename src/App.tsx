// src/App.tsx

// React import kar rahe hain
import React from "react";

// ArtworkTable component import
import ArtworkTable from "@components/ArtworkTable";

// Custom hook import (jisme API + pagination + state logic hai)
import { useHomeState } from "@src/useHomeState";

// App component start
const App: React.FC = () => {

    // Custom hook call kar rahe hain
    // Isse table ke liye sari required state aur functions mil rahe hain
    const {
        data,               // API se aaya hua table data
        loading,            // Global loading state
        totalRecords,       // Total records (pagination ke liye)
        first,              // Current page ka starting index
        rows,               // Rows per page
        selectedRows,       // Selected rows (checkbox se)
        setSelectedRows,    // Selected rows update karne ka function
        onPage,             // Page change handler
    } = useHomeState();

    // UI return kar rahe hain
    return (
        <div className="p-m-4">
            {/* Page heading */}
            <h2>Artworks</h2>

            {/* ArtworkTable component ko props pass kar rahe hain */}
            <ArtworkTable
                data={data} // Table ka data
                loading={loading} // Loader show/hide
                totalRecords={totalRecords} // Total records
                first={first} // Pagination start index
                rows={rows} // Rows per page
                selectedRows={selectedRows} // Selected rows
                onSelectionChange={setSelectedRows} // Selection change handler
                onPage={onPage} // Page change handler
            />
        </div>
    );
};

// Component export kar rahe hain
export default App;