type Concat<T extends any[], U extends any[]> = [...T, ...U];

type concat_test = [1, 2];

type concat_test2 = { [x in keyof concat_test]: concat_test[x] };

type concat_test3 = Concat<concat_test, concat_test>;

const concat_test4: concat_test3 = [1, 2, 1, 2];
