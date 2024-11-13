import { z } from "zod";
const signupSchema = z.object({
    username: z
        .string({ required_error: "Username is required" })
        .trim()
        .min(3, {
            message: "Username must be at least 3 chars",
        })
        .max(255, { message: "Username must not be more than 255 chars long" }),
    email: z
        .string({ required_error: "Email is required" })
        .email()
        .trim()
        .min(3, {
            message: "Email must be at least 3 chars",
        })
        .max(255, { message: "Email must not be more than 255 chars long" }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(8, {
            message: "Password must be at least 8 chars",
        })
        .max(255, { message: "Password must not be more than 1024 chars long" }),
});

export default signupSchema;   