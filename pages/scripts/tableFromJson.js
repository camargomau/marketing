document.addEventListener("DOMContentLoaded", function () {
	// Store all forms with the data-table attribute
	const forms = document.querySelectorAll("form[data-table]")

	forms.forEach((form) => {
		form.addEventListener("submit", function (event) {
			event.preventDefault()

			// data-table stores the table name that will be used to query
			const table = form.dataset.table
			// Find the corresponding div for the table
			const tableDiv = document.querySelector(`#${table}Table`)

			const query = document.querySelector(`#${table}Json`).value

			// Send the POST request
			fetch("http://localhost:4000/graphql", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					query: query
				})
			})
				// Parse the response as JSON
				.then((response) => response.json())
				// Put the JSON table into the div
				.then((data) => {
					console.log(data)
					tableDiv.innerHTML = buildTable(data)
				})
				.catch((error) => {
					console.error(error)
					tableDiv.innerHTML = `
					<div class="placeholder">
						<h4>Error: check console for more details</h4>
					</div>
					`
				})
		})
	})
})
