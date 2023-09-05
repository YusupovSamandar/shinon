"use client"
import React from 'react';

export default function CurrentPatient({ params }) {
    return (
        <div>
            current Patient page {params.id}
        </div>
    )
}
