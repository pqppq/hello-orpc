import type { RouterClient } from "@orpc/server";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { router } from "orpc";

const host = "http://127.0.0.1";
const port = 3000;

const link = new RPCLink({
	url: `${host}:${port}`,
	headers: { Authorization: "Bearer token" },
});

export const orpc: RouterClient<typeof router> = createORPCClient(link);
