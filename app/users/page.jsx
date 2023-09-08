import React from 'react';
import AddUser from "@/app/components/add-user";
import SwitchTabs from "@/app/components/patientTabs";
import Table from "@/app/components/table";

export default function Users() {
    return (
        <div>
            <SwitchTabs
                config={{
                    content1: { label: "Users", value: <Table /> },
                    content2: { label: "Add User", value: <AddUser /> }
                }}
            />

        </div>
    )
}
