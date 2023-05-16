document.addEventListener("DOMContentLoaded", function () {
	const forms = document.querySelectorAll("form[data-table]")

	forms.forEach((form) => {
		form.addEventListener("submit", function (event) {
			event.preventDefault()

			const table = form.dataset.table
			const tableDiv = document.querySelector(`#${table}Table`)

			// Get all input fields within the form
			const inputFields = form.querySelectorAll('input[type="text"]')
			// Extract the field names and values
			const fields = Array.from(inputFields, (input) => ({
				name: input.name,
				value: input.value
			}))

			// Build the field selections for the GraphQL query
			const fieldNames = fields.map((field) => field.name).join("\n")

			const query = `
				query($input: ${table.chatAt(0).toUpperCase() + table.slice(1)}Input!) {
					create${table.charAt(0).toUpperCase() + table.slice(1)}(input: $input) {
						${fieldNames}
          			}
        		}
      		`

			// TODO: Replace with queryGraphQL() and make it work
			/*
			fetch("http://localhost:4000/graphql", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					query: query,
					variables: { input: {
						???
					} }
				})
			})
				.then((response) => response.json())
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
				})*/
		})
	})
})
