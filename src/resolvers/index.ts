import { createTier } from "./tier/create";
import { deleteTier } from "./tier/delete";
import { readTier } from "./tier/read";
import { updateTier } from "./tier/update";

import { createBrand } from "./brand/create";
import { deleteBrand } from "./brand/delete";
import { readBrand } from "./brand/read";
import { updateBrand } from "./brand/update";

export const resolvers = {
	Query: {
		readTier,
		readBrand,
	},

	Mutation: {
		createTier,
		deleteTier,
		updateTier,

		createBrand,
		deleteBrand,
		updateBrand
	},
};
