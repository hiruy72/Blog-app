"use client"
import { authSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "better-auth/api";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { log } from "node:console";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function SignUpPage() {
        const [isPending, startTransition] = useTransition()

    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(authSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

     function onSubmit(data: z.infer<typeof authSchema>){
        startTransition(async ()=>{
            await authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,

            fetchOptions: {
                onSuccess: () => {
                    toast.success("Account Created Successfully")
                    router.push('/')

                },

                onError: (error) => {
                    toast.error(error.error.message)
                }
            }
        })
        })
        
    }
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
                <form onSubmit={form.handleSubmit(onSubmit)}>
                   <FieldGroup className="gap-y-4">
                     <Controller 
                         name="name"
                         control= {form.control}
                        render={({field, fieldState}) => (
                            <Field>
                                <FieldLabel>Full Name</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="Hiruy Legesse" {...field} />
                                {fieldState.error && (
                                    <FieldError  errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                     />
                     <Controller 
                         name="email"
                         control= {form.control}
                        render={({field, fieldState}) => (
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="hiruyadane@gmail.com" type="emal" {...field} />
                                {fieldState.error && (
                                    <FieldError  errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                     />
                     <Controller 
                         name="password"
                         control= {form.control}
                        render={({field, fieldState}) => (
                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="*****" type="password" {...field} />
                                {fieldState.error && (
                                    <FieldError  errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                     />
                     <Button disabled={isPending}>{isPending ?(
                        <>
                         <Loader2 className="size-4 animate-spin"/>
                         <span>Loadin...</span>
                        </>
                     ): (
                        <span></span>
                     )}</Button>
                   </FieldGroup>
                   
                </form>
            </CardContent>
            
            
         </Card>
        </>
    )
}