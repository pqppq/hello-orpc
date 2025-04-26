// oRPC: Getting started
// https://orpc.unnoq.com/docs/getting-started
import type { IncomingHttpHeaders } from "node:http";
import { ORPCError, os } from "@orpc/server";
import { z } from "zod";
import { PlannetSchema } from "../schemas";
import { User } from "../types";


const parseJWT: (input: any) => User | undefined = (input) => {
	// TOOD
	return { id: 1, name: "John" };
};

export const listPlanet = os
	.input(
		z.object({
			limit: z.number().int().min(1).max(100).optional(),
			cursor: z.number().int().min(0).default(0),
		}),
	)
	.output(z.array(PlannetSchema))
	.handler(async ({ input }) => {
		return [
			{
				id: 1,
				name: "plannet A",
			},
			{
				id: 2,
				name: "plannet B",
			},
			{
				id: 3,
				name: "plannet C",
			},
			{
				id: 4,
				name: "plannet D",
			},
			{
				id: 5, name: "plannet E",
			},
		];
	});

export const findPlannet = os
	.$context<{ headers: IncomingHttpHeaders }>()
	.use(({ context, next }) => {
		const user = parseJWT(context.headers.authorization?.split(" ")[1]);

		if (user) {
			return next({ context: { user } });
		}
		throw new ORPCError("UNAUTHORIZED");
	})
	.input(PlannetSchema.pick({ id: true }))
	.output(PlannetSchema)
	.handler(async ({ input, context }) => {
		// context.user <- context value has 'user context'
		return { id: 1, name: "name" };
	});

export const createPlannet = os
	.$context<{ headers: IncomingHttpHeaders }>()
	.use(({ context, next }) => {
		const user = parseJWT(context.headers.authorization?.split(" ")[1]);

		if (user) {
			return next({ context: { user } });
		}
		throw new ORPCError("UNAUTHORIZED");
	})
	.input(PlannetSchema.omit({ id: true }))
	.output(PlannetSchema)
	.handler(async ({ input, context }) => {
		return { id: 1, name: "name" };
	});

export const router = {
	plannet: {
		list: listPlanet,
		find: findPlannet,
		create: createPlannet,
	},
};
