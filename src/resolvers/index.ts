import { createTier } from "./tier/create"
import { deleteTier } from "./tier/delete"
import { readTier } from "./tier/read"
import { updateTier } from "./tier/update"

import { createBrand } from "./brand/create"
import { deleteBrand } from "./brand/delete"
import { readBrand } from "./brand/read"
import { updateBrand } from "./brand/update"

import { createSocialNetwork } from "./socialNetwork/create"
import { deleteSocialNetwork } from "./socialNetwork/delete"
import { readSocialNetwork } from "./socialNetwork/read"
import { updateSocialNetwork } from "./socialNetwork/update"

import { createBrandSocial } from "./brandSocial/create"
import { deleteBrandSocial } from "./brandSocial/delete"
import { readBrandSocial } from "./brandSocial/read"
import { updateBrandSocial } from "./brandSocial/update"

export const resolvers = {
	Query: {
		readTier,
		readBrand,
		readSocialNetwork,
		readBrandSocial
	},

	Mutation: {
		createTier,
		deleteTier,
		updateTier,

		createBrand,
		deleteBrand,
		updateBrand,

		createSocialNetwork,
		deleteSocialNetwork,
		updateSocialNetwork,

		createBrandSocial,
		deleteBrandSocial,
		updateBrandSocial
	}
}
