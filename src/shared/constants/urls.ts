export enum AppRoutes {
  ROOT = 'ROOT',
  NOT_FOUND = 'NOT_FOUND',
  LOGIN = 'LOGIN',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.ROOT]: '/users',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.NOT_FOUND]: '*',
};
