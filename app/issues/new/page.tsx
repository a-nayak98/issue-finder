"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaCircleInfo } from "react-icons/fa6";
import { createIssueSchema } from "@/app/types/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
// import {CREATEISSUE} from "../../api/issues/route";


type iFormData = z.infer<typeof createIssueSchema>
const NewIssuePage = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<iFormData>({
        resolver: zodResolver(createIssueSchema)
    });
    const router = useRouter()
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false)

    const formSubmit = async (data: iFormData) => {
        try {
            const res = await axios.post("/api/issues", data)
            console.log(res.data,"data api")
            setTimeout(() => {
                router.push("/issues")
            },5000)
            setIsSubmitting(true)
        } catch (error) {
            setIsSubmitting(false)
            setError("An unexpected error occurred.")
        }
    }
    return (
        <div className="max-w-xl mb-5">
            {error && <Callout.Root color="red">
                <Callout.Icon>
                    <FaCircleInfo />
                </Callout.Icon>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}
            <form onSubmit={handleSubmit(formSubmit)} className=" space-y-3">
                <TextField.Root placeholder="Title" size="3" {...register("title")} />
                {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
                <Controller name="description" control={control} render=
                    {({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
                {<ErrorMessage>{errors.description?.message}</ErrorMessage>}
                <Button disabled={isSubmitting}>Submit New Issue{isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
