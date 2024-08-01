"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaCircleInfo } from "react-icons/fa6";

interface iFormData {
    title: string,
    description: string
}
const NewIssuePage = () => {
    const { register, handleSubmit, control } = useForm<iFormData>();
    const router = useRouter()
    const [error, setError] = useState('');

    const formSubmit = async (data: iFormData) => {
        try {
            const res = await axios.post("/api/issues", data)
            router.push("/issues")
        } catch (error) {
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
                <Controller name="description" control={control} render=
                    {({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
