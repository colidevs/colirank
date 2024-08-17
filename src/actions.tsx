"use server";

import {api} from "@/api";

export async function AddScore(id: number, score: number) {
  api.addScore(id, score);
}
