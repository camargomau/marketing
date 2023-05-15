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
					read${ table.charAt(0).toUpperCase() + table.slice(1) }(id: $searchedId) {
						${columns.join("\n")}
          			}
        		}
      		`

			const searchedId = document.querySelector(`#${table}Id`).value
				? parseInt(document.querySelector(`#${table}Id`).value)
				: null

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
				})
		})
	})
})
