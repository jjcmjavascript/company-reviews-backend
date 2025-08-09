export const arrayEntityToHash = <
  T extends { toPrimitive: () => { id: number } },
>(
  entities: Array<T>,
): Record<number, T> =>
  entities.reduce((acc, entity) => {
    acc[entity.toPrimitive().id] = entity.toPrimitive();

    return acc;
  }, {});
