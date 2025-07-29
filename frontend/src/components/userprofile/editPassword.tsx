import { useState } from "react"
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
import { BsEye, BsEyeSlash } from "react-icons/bs"

const editPasswordSchema = z.object({
	currentPassword: z.string().min(8, "Password must be 8 characters long"),
	newPassword: z.string().min(8, "Password must be 8 characters long")
})

const EditPassword = () => {
	const [show, setShow] = useState(false)

	const form = useForm<z.infer<typeof editPasswordSchema>>({
		resolver: zodResolver(editPasswordSchema),
		defaultValues: {
			currentPassword: "",
			newPassword: "",
		}
	})

	const onSubmit = (data: z.infer<typeof editPasswordSchema>) => {
		console.log(data)
	}
	return (
		<Card>
			<CardHeader>
				<CardTitle>Password</CardTitle>
				<CardDescription>
					Change your password here. After saving, you&apos;ll be logged
					out.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-6">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 text-left">
						<FormField
							control={form.control}
							name="currentPassword"
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
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="newPassword"
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
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button>Save Password</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

export default EditPassword
