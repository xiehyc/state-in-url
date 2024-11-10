import React from "react";
import {
  type NavigateOptions,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { parseSPObj } from "../../parseSPObj";
import { useUrlStateBase } from "../../useUrlStateBase";
import {
  assignValue,
  filterUnknownParams,
  filterUnknownParamsClient,
  type JSONCompatible,
  routerHistory,
} from "../../utils";

/**
 * @deprecated .
 * * use format `useUrlState(defaultState, { ...otherParams })`
 *
 */
export function useUrlState<T extends JSONCompatible>({
  defaultState: T,
  searchParams,
  replace,
  useHistory,
}: OldParams<T>): {
  state: T;
  urlState: T;
  updateState: (value: Partial<T> | ((currState: T) => T)) => void;
  setState: (value: Partial<T> | ((currState: T) => T)) => void;
  updateUrl: (value?: Partial<T> | ((currState: T) => T)) => void;
  setUrl: (value?: Partial<T> | ((currState: T) => T)) => void;
};

/**
 * React-router hook. Returns `urlState`, `setState`, and `setUrl` functions
 *
 * @param {JSONCompatible<T>} [defaultState] Fallback (default) values for state
 * @param {Object} params - Object with other parameters
 * @param {NavigateOptions} params.NavigateOptions See type from `react-router-dom`
 * @param {boolean} params.useHistory use window.history for navigation
 * * Example:
 * ```ts
 * export const form = { name: '', age: 0 };
 * const { urlState, setState, setUrl } = useUrlState(form, { replace: false, preventScrollReset: false });
 *
 * setState({ name: 'test' });
 * setUrl({ name: 'test' }, { replace: true });
 * // similar to React.useState
 * setUrl(curr => ({ ...curr, name: 'test' }), { replace: true });
 *  ```
 *
 *  * Docs {@link https://github.com/asmyshlyaev177/state-in-url/tree/master/packages/urlstate/react-router/useUrlState#api}
 */
export function useUrlState<T extends JSONCompatible>(
  defaultState: T,
  params?: Params,
): {
  urlState: T;
  setState: (value: Partial<T> | ((currState: T) => T)) => void;
  setUrl: (value?: Partial<T> | ((currState: T) => T)) => void;
};

export function useUrlState<T extends JSONCompatible>(
  defaultState: T | OldParams<T>,
  params?: Params,
) {
  const _defaultState = (
    "defaultState" in defaultState ? defaultState.defaultState : defaultState
  ) as T;
  const _useHistory = (
    "defaultState" in defaultState
      ? defaultState.useHistory
      : params?.useHistory
  ) as boolean;
  const _opts =
    "defaultState" in defaultState
      ? {
          replace: defaultState.replace as boolean,
          preventScrollReset: defaultState.preventScrollReset as boolean,
        }
      : {
          replace: params?.replace,
          preventScrollReset: params?.preventScrollReset as boolean,
        };

  const navigate = useNavigate();
  const router = React.useMemo(
    () =>
      _useHistory
        ? routerHistory
        : {
            replace: (url: string, options: NavigateOptions) =>
              navigate(url, { ...defaultOpts, ..._opts, ...options }),
            push: (url: string, options: NavigateOptions) =>
              navigate(url, { ...defaultOpts, ..._opts, ...options }),
          },
    [navigate, _opts],
  );
  const {
    state,
    updateState,
    updateUrl: updateUrlBase,
    getState,
  } = useUrlStateBase(_defaultState, router, ({ parse }) =>
    parse(filterUnknownParamsClient(_defaultState)),
  );

  const updateUrl = React.useCallback(
    (value?: Parameters<typeof updateUrlBase>[0], options?: NavigateOptions) =>
      updateUrlBase(value, { ...defaultOpts, ..._opts, ...options }),
    [_opts],
  );

  const [sp] = useSearchParams();

  React.useEffect(() => {
    updateState(
      assignValue(
        _defaultState,
        state as T,
        filterUnknownParams(
          _defaultState,
          parseSPObj(
            Object.fromEntries([...sp.entries()]),
            _defaultState,
          ) as Partial<T>,
        ),
      ),
    );
  }, [sp]);

  return {
    /**
     * * Example:
     * ```ts
     * setState({ name: 'test' });
     * // or
     * setState(curr => ({ ...curr, name: 'test' }) );
     * // can pass optional React-Router `NavigateOptions`
     * setState(curr => ({ ...curr, name: 'test', preventScrollReset: false }) );
     *  ```
     *
     *  * Docs {@link https://github.com/asmyshlyaev177/state-in-url/tree/master/packages/urlstate/react-router/useUrlState#updatestate}
     */
    setState: updateState,
    /**
     * @deprecated use `setState`
     */
    updateState,
    /**
     * * Example:
     * ```ts
     * setUrl({ name: 'test' });
     * // or
     * setUrl(curr => ({ ...curr, name: 'test' }), { replace: true } );
     * // can pass optional React-Router `NavigateOptions`
     * setState(curr => ({ ...curr, name: 'test', preventScrollReset: false }) );
     *  ```
     *
     *  * Docs {@link https://github.com/asmyshlyaev177/state-in-url/tree/master/packages/urlstate/react-router/useUrlState#updateurl}
     */
    setUrl: updateUrl,
    /**
     * @deprecated use `setUrl`
     */
    updateUrl,
    /**
     * State object. Don't mutate directly, use `setState` or `setUrl`
     */
    urlState: state,
    /**
     * @deprecated use `urlState`
     */
    state,
    getState,
  };
}

const defaultOpts: NavigateOptions = {
  replace: true,
  preventScrollReset: true,
};

type OldParams<T> = {
  defaultState: T;
  useHistory?: boolean;
  searchParams?: object;
  replace?: boolean;
} & NavigateOptions;

interface Params extends NavigateOptions {
  useHistory?: boolean;
  searchParams?: object;
  replace?: boolean;
}
