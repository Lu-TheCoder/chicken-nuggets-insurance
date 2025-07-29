import { useState, useEffect } from "react"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EditUser from './editUser'
import EditPassword from './editPassword'
import { getCurrentUser } from "@/utils/auth"
import type { JwtPayload } from "@/utils/auth"
import { Button } from "../ui/button"

const UserProfile = () => {
	const [user, setUser] = useState<JwtPayload | null>(null)
	const [open, setOpen] = useState(false)

	useEffect(() => {
		setUser(getCurrentUser)
	}, [])

	return (
		<div>
			<Button className="rounded-full p-3 cursor-pointer" onClick={() => { setOpen(!open) }}>
				{user && user?.fname[0] + user?.lname[0]}
			</Button>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Profile</DialogTitle>
					</DialogHeader>
					<Tabs defaultValue='account' className=''>
						<TabsList>
							<TabsTrigger value="account" > Account </TabsTrigger>
							<TabsTrigger value="password"> Password </TabsTrigger>
						</TabsList>
						<TabsContent value="account"><EditUser /></TabsContent>
						<TabsContent value="password"><EditPassword /></TabsContent>
					</Tabs>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default UserProfile
