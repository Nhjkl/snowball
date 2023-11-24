type Pop<T extends unknown[]> = T extends [...infer Rest, unknown] ? Rest : [];
