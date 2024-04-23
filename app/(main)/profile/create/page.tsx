"use client";
import type { Demo } from "@/types";
import { UserPublic } from "@/types/user";
import { User } from "@prisma/client";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { useEffect, useState, useRef, ChangeEvent } from "react";

function ProfileCreate() {
    const toast = useRef(null);
    const router = useRouter();
    const [user, setUser] = useState<User>({
        id: 0,
        username: "",
        email: "",
        password: "",
    });
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const onCreate = async () => {
       await axios.post("/api/user",user);
       router.push("/profile/list")
    };
    return (
        <div className="card">
             <Toast   ref={toast}/>
            <span className="text-900 text-xl font-bold mb-4 block">
                Create User
            </span>
            <div className="grid">
                <div className="col-12 lg:col-10">
                    <div className="grid formgrid p-fluid">
                        <div className="field mb-4 col-12">
                            <label
                                htmlFor="nickname"
                                className="font-medium text-900"
                            >
                                Username
                            </label>
                            <InputText
                                id="username"
                                name="username"
                                type="text"
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="field mb-4 col-12">
                            <label
                                htmlFor="email"
                                className="font-medium text-900"
                            >
                                Email
                            </label>
                            <InputText
                                id="email"
                                type="text"
                                name="email"
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="field mb-4 col-12">
                            <label
                                htmlFor="password"
                                className="font-medium text-900"
                            >
                                Password
                            </label>
                            <InputText
                                id="password"
                                name="password"
                                type="text"
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="col-12">
                            <Button
                                label="Create User"
                                className="w-auto mt-3"
                                onClick={onCreate}
                            ></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCreate;
