export interface iTier {
	id: number
	/**
	 * The tier's name
	 * @example "Basic"
	 */
	name: string
	/**
	 * The tier's price per month, in cents
	 * @example "100"
	 */
	price: number
}
