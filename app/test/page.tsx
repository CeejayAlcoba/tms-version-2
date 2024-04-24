"use client";
import React from "react";
import * as yup from "yup";

const SignupSchema = yup.object().shape({
    name: yup
        .string()
        .min(2, "Too Short!")
        .max(70, "Too Long!")
        .required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
});

export default function ValidationSchemaExample() {
    return (
        <div>
            <h1>Signup</h1>
        </div>
    );
}
