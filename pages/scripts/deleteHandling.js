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
						tableDiv.innerHTML = `
						<div class="placeholder">
							<h4>Error: ` + data.errors[0].message + `</h4>
						</div>
						`
					}
				},
				null
			)
			/*
			fetch("http://localhost:4000/graphql", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					query: mutation,
					variables: { searchedId: searchedId }
				})
			})
				// Parse the response as JSON
				.then((response) => response.json())
				// Put the JSON table into the div
				.then((data) => {
					console.log(data)

					// Error handling's different from normal queries
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
						tableDiv.innerHTML = `
						<div class="placeholder">
							<h4>Error: check console for more details</h4>
						</div>
						`
					}
				})*/
		})
	})
})
