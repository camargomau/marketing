const jsonToTable = (rawJson) => {
	const tableJson = Object.values(rawJson.data)[0]

	const createTable = (tableJson) => {
		let tableHtml = "<table><tr>"

		// Add row of headers
		for (const header of Object.keys(tableJson[0])) {
			tableHtml += `<th>${header}</th>`
		}
		tableHtml += "</tr>"

		for (const entry of tableJson) {
			// For each entry in the array, create a row
			tableHtml += "<tr>"
			for (const column of Object.values(entry)) {
				// If the value is an object (isArray), then nest a table
				const value = Array.isArray(column) ? createTable(column) : column
				tableHtml += `<td>${value}</td>`
			}
			tableHtml += "</tr>"
		}

		tableHtml += "</table>"
		return tableHtml
	}

	return createTable(tableJson)
}
