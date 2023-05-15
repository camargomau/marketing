// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
	// Store all forms with the data-table attribute
	const forms = document.querySelectorAll("form[data-table]")

	// Loop through all forms
	forms.forEach((form) => {
		form.addEventListener("submit", function (event) {
			// Prevent the form from submitting and reloading the page
			event.preventDefault()

			// data-table stores the table name that will be used to query
			const table = form.dataset.table
			// Find the corresponding div for the table
			const tableDiv = document.querySelector(`#${table}Table`)

			// Store all checked checkboxes
			const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked')
			// Convert into an array of column names
			const columns = Array.from(checkboxes, (checkbox) => checkbox.value)

			const query = `
        query($searchedId: Int) {
          read${
						table.charAt(0).toUpperCase() + table.slice(1)
					}(id: $searchedId) {
            ${columns.join("\n")}
          }
        }
      `
			const searchedId = document.querySelector(`#${table}Id`).value
				? parseInt(document.querySelector(`#${table}Id`).value)
				: null

			// Send a POST request to the GraphQL server with the query string in the body
			fetch("http://localhost:4000/graphql", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					query: query,
					variables: { searchedId: searchedId }
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
				})
		})
	})
})
