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

			queryGraphQL(
				query,
				null,
				(data) => tableDiv.innerHTML = buildTable(data),
				(error) => tableDiv.innerHTML = `
					<div class="placeholder">
						<h4>Error: ` + error.message + `</h4>
					</div>
				`
			)
		})
	})
})
