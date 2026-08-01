import type { Customer } from "../domain/types.js";
import { customers } from "../data/customers.js";

export class CustomerRepository {
  findById(id: string): Customer | null {
    return customers.find((customer) => customer.id === id) ?? null;
  }

  findMany(): Customer[] {
    return customers;
  }
}
