import { createTier } from "./tier/create";
import { deleteTier } from "./tier/delete";
import { readTier } from "./tier/read";
import { updateTier } from "./tier/update";

import { readBrand } from "./brand/read";
import { createBrand } from "./brand/create";

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
	},
};
