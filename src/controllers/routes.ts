import meRoutes from './me/routes';
import productsRoutes from './products/routes';
import serverRoutes from './server/routes';
import usersRoutes from './users/routes';

export const routes = [serverRoutes, meRoutes, usersRoutes, productsRoutes] as const;

export type AppRoutes = (typeof routes)[number];
