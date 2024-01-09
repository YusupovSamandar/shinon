"use client";
import React from "react";
import Table from "@/app/components/advanced-table";
import SidabarWrapper from "../chunks/sidebar-wrapper";
import { CheckUserRole } from "../routerGuard";
export default function Hospitals() {
  return (
    <SidabarWrapper enableSearch={false}>
      <CheckUserRole
        allowedRoles={["developer", "admin"]}
      >
        <Table />
      </CheckUserRole>
    </SidabarWrapper>
  );
}
