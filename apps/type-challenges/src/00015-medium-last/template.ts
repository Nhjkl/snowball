type Last<T extends unknown[]> = T extends [...Rest: unknown[], infer L] ? L : [];
