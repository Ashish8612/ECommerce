import { apiGet, apiPatch } from "@/lib/api";
import type { AdminOrdersResponse, AdminUpdateOrderStatusResponse, AdminOrderStatus } from "./types";


export async function extractAdminOrders() {
  return apiGet<AdminOrdersResponse>("/admin/orders");
}

export async function updateAdminOrderStatus(
  orderId: string,
  orderStatus: AdminOrderStatus,
) {
  return apiPatch<
    AdminUpdateOrderStatusResponse,
    { orderStatus: AdminOrderStatus }
  >(`/admin/orders/${orderId}/status`, { orderStatus });
}
