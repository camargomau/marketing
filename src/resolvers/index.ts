import { createTier } from "./tier/create";
import { deleteTier } from "./tier/delete";
import { readTier } from "./tier/read";
import { updateTier } from "./tier/update";

export const resolvers = {
	Query: {
		readTier,
	},

	Mutation: {
		createTier,
		deleteTier,
		updateTier,
	},
};
