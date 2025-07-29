import { useState } from "react";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { Link } from "react-router-dom";

const signupSchema = z.object({
	first_name: z.string().min(1, "Name is required"),
	last_name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email"),
	password: z.string().min(8, 'Password must be at least 6 characters'),
})

const Signup = () => {
	const [show, setShow] = useState(false)
	const [error, setError] = useState("")

	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			password: "",
		}
	})

	const onSubmit = async (data: z.infer<typeof signupSchema>) => {
		try {
			const response = await fetch("http://localhost:3001/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data)
			});

			if (!response.ok) {
				if (response.status === 409) {
					setError("User already exists. Try logging in instead.");
				} else {
					setError("Something went wrong.");
				}
				return;
			}


			window.location.href = "/signin";

		} catch (err) {
			console.error(err);
			setError("Server error. Please try again later.");
		}
	}

	return (
		<main className="flex flex-col w-screen h-screen items-center justify-center">
			<h1>Sign Up</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 space-y-6 text-left">
					<FormField
						control={form.control}
						name="first_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input placeholder="John" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="last_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder="Doe" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="example@gmail.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<div className="relative">
										<Input placeholder="password" {...field} type={show ? "text" : "password"} />
										<Button
											type="button"
											onClick={() => setShow(!show)}
											className="absolute right-0 top-1/2 -translate-y-1/2"
											size="sm"
										>
											{show ? <BsEyeSlash /> : <BsEye />}
										</Button>
									</div>
								</FormControl>
								{error && <p className="text-red-500 text-sm">{error}</p>}
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Sign Up</Button>
				</form>
			</Form>
			<p className="pt-10">Already have an account? <Link to="../signin">Sign in</Link> </p>
		</main>
	)
}

export default Signup
