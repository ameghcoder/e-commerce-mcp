// Public surface of the domain/data/service foundation. The MCP tool layer
// (src/mcp/server.ts) depends only on this surface — never on data modules
// or repository internals directly.

export * from "./domain/enums.js";
export * from "./domain/types.js";

export { CustomerRepository } from "./repositories/customer.repository.js";
export { FulfillmentRepository } from "./repositories/fulfillment.repository.js";
export { InventoryRepository } from "./repositories/inventory.repository.js";
export { OrderRepository } from "./repositories/order.repository.js";
export type { OrderFilters } from "./repositories/order.repository.js";
export { PaymentRepository } from "./repositories/payment.repository.js";
export { ProductRepository } from "./repositories/product.repository.js";

export { OrderContextService } from "./services/order-context.service.js";
export type { OrderContext, OrderContextItem } from "./services/order-context.service.js";

export { DelayDiagnosisService, DELAY_DIAGNOSIS_CATEGORIES } from "./services/delay-diagnosis.service.js";
export type { DelayDiagnosis, DelayDiagnosisCategory } from "./services/delay-diagnosis.service.js";

export { ResolutionService } from "./services/resolution.service.js";
export type { ResolutionRecommendation } from "./services/resolution.service.js";
