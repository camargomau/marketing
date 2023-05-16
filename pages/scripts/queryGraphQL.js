function queryGraphQL(query, variables, successFunction, errorFunction) {
	// Send the POST request
	fetch("http://localhost:4000/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			query: query,
			variables: variables
		})
	})
		// Parse the response as JSON
		.then((response) => response.json())
		// Put the JSON table into the div
		.then((data) => {
			console.log(data)
			successFunction(data)
		})
		.catch((error) => {
			console.error(error)
			errorFunction(error)
		})
}
