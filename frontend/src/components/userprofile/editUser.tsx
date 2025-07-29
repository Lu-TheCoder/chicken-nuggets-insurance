import { useState, useEffect } from "react"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getCurrentUser } from "@/utils/auth"
import type { JwtPayload } from "@/utils/auth"

const editUserSchema = z.object({
	first_name: z.string().min(1, "Invalid name"),
	last_name: z.string().min(1, "Invalid name"),
	email: z.string().email("Invalid email")
})

const EditUser = () => {
	const [user, setUser] = useState<JwtPayload | null>(null)

	const form = useForm<z.infer<typeof editUserSchema>>({
		resolver: zodResolver(editUserSchema),
		defaultValues: {
			//add default values here according to the jwt token
			first_name: user?.fname,
			last_name: user?.lname,
			email: user?.email,
		}
	})

	useEffect(() => {
		const currentUser = getCurrentUser()
		setUser(currentUser)
		if (currentUser) {
			form.reset({
				first_name: currentUser.fname,
				last_name: currentUser.lname,
				email: currentUser.email,
			})
		}
	}, [])




	const onSubmit = (data: z.infer<typeof editUserSchema>) => {
		//
		console.log(data)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Account</CardTitle>
				<CardDescription>
					Make changes to your account here. Click save when you&apos;re
					done.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-6">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 text-left">
						<FormField
							control={form.control}
							name="first_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<Input placeholder="Enter your first name" {...field} />
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
										<Input placeholder="Enter your last name" {...field} />
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
						<Button>Save changes</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

export default EditUser
