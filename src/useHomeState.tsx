// React ke hooks import kar rahe hain
import { useEffect, useState } from "react";

// PrimeReact ka pagination event type
import type { DataTablePageEvent } from "primereact/datatable";

// Custom axios instance (jisme interceptors lage hue hain)
import axiosInstance from "@api/axios";

// API response aur Artwork type import kar rahe hain
import type { ArticApiResponse, Artwork } from "@models/artwork";

// Loading context (global loader state ke liye)
import { useApiLoading } from "@context/LoadingContext";

// Custom hook start
export const useHomeState = () => {

    // Table ka data store karne ke liye state
    const [data, setData] = useState<Artwork[]>([]);

    // Total records (pagination ke liye)
    const [totalRecords, setTotalRecords] = useState(0);

    // Current page ka starting index (PrimeReact ka format)
    const [first, setFirst] = useState(0);

    // Har page me kitne rows dikhane hain
    const [rows, setRows] = useState(10);

    // Global loading state context se le rahe hain
    const { loading } = useApiLoading();

    // Selected rows ka state (checkbox selection ke liye)
    const [selectedRows, setSelectedRows] = useState<Artwork[]>([]);

    // ================= DATA LOAD FUNCTION =================

    // API se data fetch karne ka function
    const loadData = async (pageNumber = 1, pageSize = 5) => {
        try {
            // API call kar rahe hain (page aur limit ke saath)
            const res = await axiosInstance.get<ArticApiResponse>(
                `/artworks?page=${pageNumber}&limit=${pageSize}`
            );

            // Response ka data extract kar rahe hain
            const json = res.data;

            // Table data set kar rahe hain
            setData(json.data);

            // Total records set kar rahe hain (pagination ke liye)
            setTotalRecords(json.pagination.total);

        } catch (err) {
            // Agar error aaye to console me print
            console.error(err);
        }
    };

    // ================= USE EFFECT =================

    // Jab bhi first (page index) ya rows (page size) change hoga
    // tab data dobara load hoga
    useEffect(() => {

        // PrimeReact first ko pageNumber me convert kar rahe hain
        // Example: first = 0, rows = 10 => pageNumber = 1
        const pageNumber = Math.floor(first / rows) + 1;

        // API call
        loadData(pageNumber, rows);

    }, [first, rows]); // Dependency array

    // ================= PAGINATION HANDLER =================

    // Jab user page change karega
    const onPage = (event: DataTablePageEvent) => {

        // Naya starting index set
        setFirst(event.first!);

        // Naya rows per page set
        setRows(event.rows!);
    };

    // Hook se yeh sab values return ho rahi hain
    return {
        data,               // Table data
        loading,            // Loader state
        totalRecords,       // Total records
        first,              // Current start index
        rows,               // Rows per page
        selectedRows,       // Selected rows
        setSelectedRows,    // Selected rows update function
        onPage,             // Pagination handler
    }
}