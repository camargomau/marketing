const jsonToTable = (rawJson) => {
	const tableJson = rawJson.data[Object.keys(rawJson.data)[0]]

	createTable = (tableJson) => {
		let tableHtml = "<table><tr>"

		// Add row of headers
		for (header in tableJson[0]) {
			tableHtml += "<th>" + header + "</th>"
		}
		tableHtml += "</tr>"

		for (index in tableJson) {
			let entry = tableJson[index]

			// For each entry in the array, create a row
			tableHtml += "<tr>"
			for (column in entry) {
				value = entry[column]

				// If the value in each row is not an object, just put it
				if (typeof value != "object") {
					tableHtml += "<td>" + entry[column] + "</td>"
					// If it is an object, recursively put a table inside
				} else {
					tableHtml += "<td>" + createTable([value], "") + "</td>"
				}
			}
			tableHtml += "</tr>"
		}

		tableHtml += "</table>"
		return tableHtml
	}

	return createTable(tableJson)
}
