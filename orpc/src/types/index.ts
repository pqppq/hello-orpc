import { z } from "zod";
import { PlannetSchema } from "../schemas";

export type User = { id: number; name: string };
export type Plannet = z.infer<typeof PlannetSchema>;
