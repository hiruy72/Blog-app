"use client"
import { authSchema } from "@/app/schemas/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export default function SignUpPage() {
    const form = useForm({
        resolver: zodResolver(authSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })
    return(
        <>
         <Card>
            <CardHeader>
                <CardTitle>SignUp</CardTitle>
            <CardDescription>
                 Create your account here.
            </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                   <FieldGroup>
                     <Controller 
                         name="name"
                         control= {form.control}
                        render={({field, fieldState}) => (
                            <Field>
                                <FieldLabel>Full Name</FieldLabel>
                                <Input placeholder="Hiruy Legesse" {...field} />
                                {fieldState.error && (
                                    <FieldError  errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                     />
                   </FieldGroup>
                </form>
            </CardContent>
            
         </Card>
        </>
    )
}