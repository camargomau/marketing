document.addEventListener("DOMContentLoaded", function () {
	const forms = document.querySelectorAll("form[data-table]")

	forms.forEach((form) => {
		form.addEventListener("submit", function (event) {
			event.preventDefault()

			const table = form.dataset.table
			const tableDiv = document.querySelector(`#${table}Table`)

			const query = `
				mutation($searchedId: Int!) {
					delete${table.charAt(0).toUpperCase() + table.slice(1)}(id: $searchedId) {
						id
          			}
        		}
      		`

			const searchedId = document.querySelector(`#${table}Id`).value
				? parseInt(document.querySelector(`#${table}Id`).value)
				: null

			queryGraphQL(
				query,
				{ searchedId: searchedId },
				(data) => {
					if (!data.errors) {
						tableDiv.innerHTML =
							`
					<div class="placeholder">
						<h4>Success: entry with ID ` +
							searchedId +
							` deleted</h4>
					</div>
					`
					} else {
						tableDiv.innerHTML =
							`
						<div class="placeholder">
							<h4>Error: ` +
							data.errors[0].message +
							`</h4>
						</div>
						`
					}
				},
				null
			)
		})
	})
})
