document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("tierForm")

	form.addEventListener("submit", function (event) {
		event.preventDefault() // Prevent the default form submission behavior

		const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked')
		const columns = Array.from(checkboxes, (checkbox) => checkbox.value)

		const query = `
		query {
			readTier {
			${columns.join("\n")}
			}
		}
	`

		fetch("http://localhost:4000/graphql", {
			// Send a POST request to the desired URL
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				query: query
			})
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data) // Handle the response returned by the server, and do something with it
				document.write(jsonToTable(data))
			})
			.catch((error) => {
				console.error(error)
			})
	})
})
