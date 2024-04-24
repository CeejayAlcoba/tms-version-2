import { ErrorMessage, Field, useFormikContext } from "formik";
import { classNames } from "primereact/utils";
import React from "react";

export type FormiksControlPros = {
    name: string;
    label?: string;
    component: React.ReactNode;
};

export function FormiksControl(props: FormiksControlPros) {
    const { errors, touched } = useFormikContext<any>();
    return (
        <div className="field">
            {props.label && (
                <div className="font-medium text-900">{props.label}</div>
            )}
            <Field autoComplete="off" name={props.name}>
                {({ field }: any) =>
                    React.cloneElement(props.component as any, {
                        ...field,
                        className: classNames({
                            "p-invalid":
                                (errors as any)[props.name] &&
                                (touched as any)[props.name],
                        }),
                    })
                }
            </Field>
            <ErrorMessage
                name={props.name}
                component="div"
                className="text-red-500 text-xs italic"
            />
        </div>
    );
}
