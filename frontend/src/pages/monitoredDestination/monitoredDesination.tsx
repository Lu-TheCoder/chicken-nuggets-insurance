import * as React from "react"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface MonitoredDestination {
	id: number
	location: string
	riskLevel: string
	lastChecked: string
}

const initialData: MonitoredDestination[] = [
	{ id: 1, location: "Paris", riskLevel: "Low", lastChecked: "2025-07-29" },
	{ id: 2, location: "Tokyo", riskLevel: "Medium", lastChecked: "2025-07-28" },
	{ id: 3, location: "New York", riskLevel: "High", lastChecked: "2025-07-27" },
	{ id: 4, location: "Sydney", riskLevel: "Low", lastChecked: "2025-07-26" },
	{ id: 5, location: "London", riskLevel: "Medium", lastChecked: "2025-07-25" },
	{ id: 6, location: "Berlin", riskLevel: "Low", lastChecked: "2025-07-24" },
	{ id: 7, location: "Dubai", riskLevel: "High", lastChecked: "2025-07-23" },
	{ id: 8, location: "Cape Town", riskLevel: "Medium", lastChecked: "2025-07-22" },
	{ id: 11, location: "Paris", riskLevel: "Low", lastChecked: "2025-07-29" },
	{ id: 12, location: "Tokyo", riskLevel: "Medium", lastChecked: "2025-07-28" },
	{ id: 13, location: "New York", riskLevel: "High", lastChecked: "2025-07-27" },
	{ id: 14, location: "Sydney", riskLevel: "Low", lastChecked: "2025-07-26" },
	{ id: 15, location: "London", riskLevel: "Medium", lastChecked: "2025-07-25" },
	{ id: 16, location: "Berlin", riskLevel: "Low", lastChecked: "2025-07-24" },
	{ id: 17, location: "Dubai", riskLevel: "High", lastChecked: "2025-07-23" },
	{ id: 18, location: "Cape Town", riskLevel: "Medium", lastChecked: "2025-07-22" },
	{ id: 21, location: "Paris", riskLevel: "Low", lastChecked: "2025-07-29" },
	{ id: 22, location: "Tokyo", riskLevel: "Medium", lastChecked: "2025-07-28" },
	{ id: 23, location: "New York", riskLevel: "High", lastChecked: "2025-07-27" },
	{ id: 24, location: "Sydney", riskLevel: "Low", lastChecked: "2025-07-26" },
	{ id: 25, location: "London", riskLevel: "Medium", lastChecked: "2025-07-25" },
	{ id: 26, location: "Berlin", riskLevel: "Low", lastChecked: "2025-07-24" },
	{ id: 27, location: "Dubai", riskLevel: "High", lastChecked: "2025-07-23" },
	{ id: 28, location: "Cape Town", riskLevel: "Medium", lastChecked: "2025-07-22" },
]

export default function MonitoredDestinationsTable() {
	const [data, setData] = React.useState(initialData)
	const [page, setPage] = React.useState(1)
	const pageSize = 10

	const [open, setOpen] = React.useState(false)
	const [current, setCurrent] = React.useState<MonitoredDestination | null>(null)

	const totalPages = Math.ceil(data.length / pageSize)
	const start = (page - 1) * pageSize
	const end = start + pageSize
	const pageData = data.slice(start, end)

	const handleEdit = (destination: MonitoredDestination) => {
		setCurrent(destination)
		setOpen(true)
	}

	const handleSave = () => {
		if (current) {
			setData((prev) =>
				prev.map((d) => (d.id === current.id ? current : d))
			)
			setOpen(false)
		}
	}

	const handleDelete = (id: number) => {
		setData((prev) => prev.filter((d) => d.id !== id))
	}

	return (
		<Card className="m-5">
			<CardHeader>
				<CardTitle>Monitored Destinations</CardTitle>
				<CardDescription>
					View all the destinations you are monitoring
				</CardDescription>
				<CardAction>
					<Button>Add destination</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Location</TableHead>
								<TableHead>Risk Level</TableHead>
								<TableHead>Last Checked</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{pageData.map((destination) => (
								<TableRow key={destination.id}>
									<TableCell>{destination.location}</TableCell>
									<TableCell>{destination.riskLevel}</TableCell>
									<TableCell>{destination.lastChecked}</TableCell>
									<TableCell className="flex gap-2">
										<Button
											variant="outline"
											size="sm"
											onClick={() => handleEdit(destination)}
										>
											Edit
										</Button>
										<Button
											variant="destructive"
											size="sm"
											onClick={() => handleDelete(destination.id)}
										>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					{
						<div className="flex items-center justify-between w-full px-[35%]">
							<Button
								variant="outline"
								disabled={page === 1}
								onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
							>
								Previous
							</Button>

							<span>
								Page {page} of {totalPages}
							</span>

							<Button
								variant="outline"
								disabled={page === totalPages}
								onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
							>
								Next
							</Button>
						</div>
					}
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Edit Destination</DialogTitle>
							</DialogHeader>
							{current && (
								<div className="space-y-4">
									<Input
										value={current.location}
										onChange={(e) =>
											setCurrent({ ...current, location: e.target.value })
										}
										placeholder="Location"
									/>
									<Input
										value={current.riskLevel}
										onChange={(e) =>
											setCurrent({ ...current, riskLevel: e.target.value })
										}
										placeholder="Risk Level"
									/>
									<Input
										value={current.lastChecked}
										onChange={(e) =>
											setCurrent({ ...current, lastChecked: e.target.value })
										}
										placeholder="Last Checked"
									/>
								</div>
							)}
							<DialogFooter>
								<Button variant="outline" onClick={() => setOpen(false)}>
									Cancel
								</Button>
								<Button onClick={handleSave}>Save</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</CardContent>
		</Card>
	)
}
