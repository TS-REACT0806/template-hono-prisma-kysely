// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck NOTE: Remove this when you are changing something in this file and put it back once you are done
import { type HonoEnv } from '@/types/hono';
import { OpenAPIHono } from '@hono/zod-openapi';
import { getProductsRoute, getProductsRouteHandler } from './get-products';
import { searchProductsRoute, searchProductsRouteHandler } from './search-products';

const productsRoutes = new OpenAPIHono<HonoEnv>()
  .openapi(getProductsRoute, getProductsRouteHandler)
  .openapi(searchProductsRoute, searchProductsRouteHandler);

export default productsRoutes;
