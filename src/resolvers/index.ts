import { createBrand, deleteBrand, readBrand, updateBrand } from "./brand"
import {
	createBrandSocial,
	deleteBrandSocial,
	readBrandSocial,
	updateBrandSocial
} from "./brandSocial"
import {
	createSocialNetwork,
	deleteSocialNetwork,
	readSocialNetwork,
	updateSocialNetwork
} from "./socialNetwork"
import { createTier, deleteTier, readTier, updateTier } from "./tier"

export const resolvers = {
	Query: {
		readBrand,
		readBrandSocial,
		readSocialNetwork,
		readTier
	},

	Mutation: {
		createBrand,
		deleteBrand,
		updateBrand,

		createBrandSocial,
		deleteBrandSocial,
		updateBrandSocial,

		createSocialNetwork,
		deleteSocialNetwork,
		updateSocialNetwork,

		createTier,
		deleteTier,
		updateTier
	}
}
