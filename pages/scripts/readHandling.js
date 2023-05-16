document.addEventListener("DOMContentLoaded", function () {
	const forms = document.querySelectorAll("form[data-table]")

	forms.forEach((form) => {
		form.addEventListener("submit", function (event) {
			event.preventDefault()

			const table = form.dataset.table
			const tableDiv = document.querySelector(`#${table}Table`)

			// Store all checked checkboxes
			const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked')
			// Convert into an array of column names
			const columns = Array.from(checkboxes, (checkbox) => checkbox.value)

			const query = `
				query($searchedId: Int) {
					read${table.charAt(0).toUpperCase() + table.slice(1)}(id: $searchedId) {
						${columns.join("\n")}
          			}
        		}
      		`

			const searchedId = document.querySelector(`#${table}Id`).value
				? parseInt(document.querySelector(`#${table}Id`).value)
				: null

			queryGraphQL(
				query,
				{ searchedId: searchedId },
				(data) => (tableDiv.innerHTML = buildTable(data)),
				(error) =>
					(tableDiv.innerHTML =
						`
					<div class="placeholder">
						<h4>Error: ` +
						error.message +
						`</h4>
					</div>
				`)
			)
		})
	})
})
