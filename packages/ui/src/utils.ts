export class HotPromise<T = void> extends Promise<T> {
  resolve: () => void;
  isResolved: boolean;
}

export const createHotPromise = <T = void>() => {
  let resolve;
  const promise = new HotPromise<T>((r) => {
    resolve = (...args) => {
      promise.isResolved = true;
      r(...args);
    };
  });
  promise.resolve = resolve;
  return promise;
};

export function getPagesArray(
  currentPage: number,
  totalPages: number,
  paginationWrap: number
) {
  const basement: number[] = [];
  const maxPage = totalPages - 1;

  basement.push(0);

  if (currentPage > 1 && basement[basement.length - 1] !== currentPage) {
    basement.push(currentPage);
  }

  if (maxPage > 1 && basement[basement.length - 1] !== maxPage) {
    basement.push(maxPage);
  }

  const pages: number[] = [];

  for (let i = 0; i < basement.length; i++) {
    const element = basement[i];
    for (
      let k = Math.max(element - paginationWrap, 0);
      k <= Math.min(element + paginationWrap, maxPage);
      k++
    ) {
      if (!pages.includes(k)) {
        pages.push(k);
      }
    }
  }

  for (let i = 0; i < pages.length; i++) {
    if (i !== pages.length - 1) {
      if (
        pages[i + 1] != null &&
        pages[i] != null &&
        pages[i] + 1 !== pages[i + 1]
      ) {
        pages.splice(2, 0, null);
      }
    }
  }

  return pages;
}
