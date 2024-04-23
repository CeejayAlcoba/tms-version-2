"use client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { UserPublic } from "@/types/user";
import axios from "axios";
import { useQueries } from "react-query";

function List() {
    const [users, setUsers] = useState<UserPublic[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({});
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const router = useRouter();
    const dt = useRef(null);

    const fetchUsers = async () => {
        setLoading(true);
        const { data } = await axios.get("/api/user");
        const users: UserPublic[] = data;
        setUsers(users);
        setLoading(false);
        return users;
    };
    

    useEffect(() => {
        fetchUsers();
        return () => {
            setUsers([]);
        };
    }, []);

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        let _filters = { ...filters };
        (_filters["global"] as any).value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <i className="pi pi-search"></i>
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Global Search"
                        className="w-full"
                    />
                </span>
                <Button
                    type="button"
                    icon="pi pi-user-plus"
                    label="Add New"
                    className="w-full sm:w-auto flex-order-0 sm:flex-order-1"
                    outlined
                    onClick={() => router.push("/profile/create")}
                />
            </div>
        );
    };

    const header = renderHeader();

    return (
        <div className="card">
            <DataTable
                ref={dt}
                value={users}
                header={header}
                paginator
                rows={10}
                responsiveLayout="scroll"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                rowsPerPageOptions={[10, 25, 50]}
                filters={filters}
                loading={loading}
            >
                <Column
                    field="id"
                    header="ID"
                    sortable
                    // body={dateBodyTemplate}
                    headerClassName="white-space-nowrap"
                    style={{ width: "25%" }}
                ></Column>
                <Column
                    field="username"
                    header="Username"
                    sortable
                    // body={nameBodyTemplate}
                    headerClassName="white-space-nowrap"
                    style={{ width: "25%" }}
                ></Column>
                <Column
                    field="email"
                    header="Email"
                    sortable
                    // body={countryBodyTemplate}
                    headerClassName="white-space-nowrap"
                    style={{ width: "25%" }}
                ></Column>
            </DataTable>
        </div>
    );
}

export default List;
