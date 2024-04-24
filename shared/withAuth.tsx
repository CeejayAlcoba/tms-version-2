"use client";
import { useRouter } from "next/navigation";

import React from "react";
import { NextComponentType, NextPageContext } from "next";
import { decodeToken } from "./jwt";

interface AuthProps {
    token?: string;
    user?: any;
}

const withAuth = <P extends object>(
    Component: NextComponentType<P, any, P> & {
        getInitialProps?: (ctx: NextPageContext) => Promise<P>;
    }
) => {
    const Auth: React.FC<P & AuthProps> = (props) => {
        const router = useRouter();
        const token = localStorage.getItem("token");
        console.log(token);
        if (!token) {
            router.push("/auth/login");
            return null;
        }

        const user = decodeToken(token);
        console.log(user);
        if (!user) {
            router.push("/auth/login");
            return null;
        }

        return <Component {...(props as P)} />;
    };

    // if (Component.getInitialProps) {
    //     Auth.getInitialProps = Component.getInitialProps;
    // }

    return Auth;
};

export default withAuth;
