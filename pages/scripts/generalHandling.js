document.addEventListener("DOMContentLoaded", function () {
	// Store all forms with the data-table attribute
	const forms = document.querySelectorAll("form[data-table]")

	forms.forEach((form) => {
		form.addEventListener("submit", function (event) {
			event.preventDefault()

			// Find the corresponding div for the table
			const tableDiv = document.getElementById("table")
			const responseArea = document.getElementById("response")

			const query = document.getElementById("json").value

			queryGraphQL(
				query,
				null,
				(data) => {
					tableDiv.innerHTML = buildTable(data)
					responseArea.textContent = JSON.stringify(data, null, 2)
				},
				(error) => tableDiv.innerHTML = `
					<div class="placeholder">
						<h4>Error: ` + error.message + `</h4>
					</div>
				`
			)
		})
	})
})
