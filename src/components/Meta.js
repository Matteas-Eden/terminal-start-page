import React, { useEffect, useState } from "react"
import Head from "next/head"
import { useSettings } from "@/context/settings"
import { fetchAsset } from "@/utils/fetchAsset"

const Meta = () => {
	const [title, setTitle] = useState("Start Page")
	const [icon, setIcon] = useState(null)
	const { settings } = useSettings()

	useEffect(() => {
		// Set title
		setTitle(settings.title ? settings.title : settings.username + " Start Page")

		// Fetch icon image
		fetchAsset("assets/logo.svg")
			.then((data) => {
				if (data) {
					setIcon(data)
				}
			})
			.catch((error) => {
				console.error("Failed to fetch icon:", error)
			})
	}, [settings.username, settings.title])

	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={`Start page of ${settings.username}`} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" type="image/svg+xml" href={`${icon}`} />
			<meta name="robots" content="noindex, nofollow"></meta>
		</Head>
	)
}

export default Meta
