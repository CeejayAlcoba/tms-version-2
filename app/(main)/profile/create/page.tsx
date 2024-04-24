"use client";

import { FormiksControl } from "@/shared/components/formiks-control/FormiksControl";
import axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import * as yup from "yup";

const createUserSchema = yup.object().shape({
    username: yup
        .string()
        .min(2, "Too Short!")
        .max(70, "Too Long!")
        .required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), ""], "Passwords doesn't must match")
        .required("Required"),
});
function ProfileCreate() {
    const toast = useRef<Toast>(null);
    const router = useRouter();

    const onCreate = async (e: any) => {
        try {
            const { confirmPassword, ...rest } = e;
            const res = await axios.post("/api/user", rest);
            console.log(res);
            // router.push("/profile/list");
        } catch (ex: any) {
            showError(ex?.response.data.error);
        }
    };
    const showError = (message: string) => {
        toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: message,
            life: 3000,
        });
    };
    return (
        <div className="card">
            <Toast ref={toast} />
            <span className="text-900 text-xl font-bold mb-4 block">
                Create User
            </span>
            <Formik
                initialValues={{
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                }}
                validationSchema={createUserSchema}
                onSubmit={onCreate}
            >
                <Form>
                    <FormiksControl
                        label="Username"
                        name="username"
                        component={<InputText />}
                    />
                    <FormiksControl
                        label="Email"
                        name="email"
                        component={<InputText />}
                    />
                    <FormiksControl
                        label="Password"
                        name="password"
                        component={<InputText type="password" />}
                    />
                    <FormiksControl
                        label="Confirm Password"
                        name="confirmPassword"
                        component={<InputText type="password" />}
                    />
                    <Button label="Create User" type="submit" />
                </Form>
            </Formik>

            {/* <CustomFormik
                formInputs={formInputs}
                btnLabel="Create User"
                onSubmit={onCreate}
                yupchema={createUserSchema}
            /> */}
        </div>
    );
}

export default ProfileCreate;
