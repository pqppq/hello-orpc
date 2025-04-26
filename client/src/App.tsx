import { type Plannet } from "orpc";
import { orpc } from "./orpc-client";
import { useState } from "react";

function App() {
	const [plannetId, setPlannetId] = useState<number>();
	const [plannet, setPlannet] = useState<Plannet>();
	const [plannets, setPlannets] = useState<Plannet[]>([]);

	return (
		<div>
			<div>
				<button
					onClick={async () => {
						const plannets = await orpc.plannet.list({});
						setPlannets(plannets);
					}}
				>
					list plannets
				</button>
				<p>plannets</p>
				{plannets.map(({ id, name }) => (
					<div>
						{id}: {name}
					</div>
				))}
			</div>
			<div>
				id:
				<input
					onChange={(e) => {
						if (plannet) {
							setPlannet(undefined);
						}
						const id = parseInt(e.target.value);
						if (!isNaN(id)) {
							setPlannetId(Number(e.target.value));
						}
					}}
				/>
				<button
					disabled={plannetId === undefined}
					onClick={async () => {
						const plannet = await orpc.plannet.find({ id: plannetId });
						setPlannet(plannet);
					}}
				>
					search plannet
				</button>
				{plannet ? (
					<div>
						search result ...`id {plannet.id}, name: {plannet.name}`
					</div>
				) : null}
			</div>
		</div>
	);
}

export default App;
