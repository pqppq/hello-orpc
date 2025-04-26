import { createServer } from "node:http";
import { RPCHandler } from "@orpc/server/node";
import { CORSPlugin } from "@orpc/server/plugins";
import { router } from "./router";

export { router } from "./router";
export * from "./types";

// create RPC handler
const handler = new RPCHandler(router, {
	plugins: [new CORSPlugin()],
});

// create server
const server = createServer(async (req, res) => {
	const result = await handler.handle(req, res, {
		context: { headers: req.headers },
	});

	if (!result.matched) {
		res.statusCode = 404;
		res.end("No procedure matched.");
	}
});

const host = "127.0.0.1";
const port = 3000;
// start server
server.listen(port, host, () => console.log(`Listening on ${host}:${port}`));
