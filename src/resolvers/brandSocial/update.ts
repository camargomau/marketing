import { iContext } from "index"

export const updateBrandSocial = async (
	parent: any,
	args: {
		id: number
		input: {
			fkBrand?: number
			fkSocialNetwork?: number
			username?: string
			creationDate?: string
		}
	},
	{ db }: iContext,
	info: any
) => {
	const toUpdate = await db.sequelize.models.BrandSocial.findByPk(args.id)

	if (!toUpdate) {
		throw new Error(`No entry with the id ${args.id} could be found`)
	} else {
		return await toUpdate.update(args.input)
	}
}
