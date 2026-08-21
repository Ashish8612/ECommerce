import { apiPost, apiGet } from "@/lib/api";
import type { SyncResponse, MeResponse } from "./types";



export function syncUser(){
     return apiPost<SyncResponse>("/auth/sync");
}

export function getMe(){
     return apiGet<MeResponse>("/auth/me");
}
