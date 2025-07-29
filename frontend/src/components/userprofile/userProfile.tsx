
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IoChevronDownOutline } from "react-icons/io5"
import EditUser from './editUser'
import EditPassword from './editPassword'
const UserProfile = () => {
	return (
		<Popover>
			<PopoverTrigger>
				<div className="bg-white text-black flex flex-row items-center justify-between">
					<span>Boitumelo Mkhwanazi</span>
					<IoChevronDownOutline />
				</div>
			</PopoverTrigger>
			<PopoverContent>
				<Tabs defaultValue='account' className=''>
					<TabsList>
						<TabsTrigger value="account" > Account </TabsTrigger>
						<TabsTrigger value="password"> Password </TabsTrigger>
					</TabsList>
					<TabsContent value="account"><EditUser /></TabsContent>
					<TabsContent value="password"><EditPassword /></TabsContent>
				</Tabs>
			</PopoverContent>
		</Popover>
	)
}

export default UserProfile
