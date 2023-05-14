import { iContext } from "index"

export const updateTier = async (
	parent: any,
	args: {
		id: number
		input: {
			name?: string
			price?: number
		}
	},
	{ db }: iContext,
	info: any
) => {
	const toUpdate = await db.sequelize.models.Tier.findByPk(args.id)

	if (!toUpdate) {
		throw new Error(`No entry with the id ${args.id} could be found`)
	} else {
		return await toUpdate.update(args.input)
	}
}
