import { useRouter } from 'next/navigation';
import React from 'react';

import { parseSsrQs } from '../encoder';
import { useState } from '../state';
import { type DeepReadonly, isSSR, type JSONCompatible } from '../utils';

/**
 * NextJS hook. Returns `state`, `updateState`, and `updateUrl` functions
 *
 * @param {JSONCompatible<T>} [defaultState] Fallback (default) values for state
 * @param {?SearchParams<T>} [searchParams] searchParams from Next server component
 *
 * * Example:
 * ```ts
 * export const form = { name: '' };
 * const { state, updateState, updateUrl } = useUrlState(form);
 *
 * updateState({ name: 'test' });
 * // by default it's uses router.push with scroll: false
 * updateUrl({ name: 'test' }, { replace: true, scroll: true });
 *  ```
 *
 *  * Github {@link https://github.com/asmyshlyaev177/state-in-url}
 */
export function useUrlState<T extends JSONCompatible>(
  defaultState: T,
  sp?: object,
) {
  const { state, getState, setState, stringify } = useState(
    isSSR() ? parseSsrQs(sp, defaultState) : defaultState,
  );

  const router = useRouter();

  const updateUrl = React.useCallback(
    (
      value?: typeof state | ((currState: typeof state) => typeof state),
      options?: Options,
    ) => {
      const currSP = window.location.search;
      const currUrl = `${window.location.pathname}${currSP.length && !currSP.includes('?') ? '?' : ''}${currSP}`;
      const isFunc = typeof value === 'function';

      let newVal: T;
      let qStr: string;
      if (isFunc) {
        newVal = value(getState());
        qStr = stringify(newVal);
      } else {
        newVal = value ?? getState();
        qStr = stringify(newVal);
      }
      setState(newVal);

      const newUrl = `${window.location.pathname}${qStr.length ? '?' : ''}${qStr}`;

      if (currUrl !== newUrl) {
        const { replace, ...rOptions } = options || {};
        router[replace ? 'replace' : 'push'](newUrl, {
          scroll: false,
          ...rOptions,
        });
      }
    },
    [router, stringify, getState],
  );

  return {
    updateUrl,
    updateState: setState,
    state: state as DeepReadonly<typeof state>,
  };
}

type Router = ReturnType<typeof useRouter>;
type RouterOptions = NonNullable<Parameters<Router['push']>[1]>;

interface Options extends RouterOptions {
  replace?: boolean;
}
