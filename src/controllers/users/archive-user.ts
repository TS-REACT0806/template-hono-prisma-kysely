import { userSchemaOpenApi } from '@/data/users/schema';
import { updateUserData } from '@/data/users/update-user';
import type { AppRouteHandler } from '@/types/hono';
import { createRoute, z } from '@hono/zod-openapi';
import { sql } from 'kysely';

export const archiveUserSchema = {
  params: z.object({
    user_id: z
      .string()
      .uuid()
      .openapi({
        param: { name: 'user_id', in: 'path' },
        example: '123e4567-e89b-12d3-a456-426614174000',
      }),
  }),
  response: userSchemaOpenApi,
};

export type ArchiveUserParams = z.infer<typeof archiveUserSchema.params>;
export type ArchiveUserResponse = z.infer<typeof archiveUserSchema.response>;

export const archiveUserRoute = createRoute({
  middleware: [],
  security: [{ bearerAuth: [] }],
  method: 'delete',
  path: '/users/{user_id}/archive',
  tags: ['Users'],
  summary: 'Archive a user',
  description: 'Archive a user.',
  request: {
    params: archiveUserSchema.params,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: archiveUserSchema.response,
        },
      },
      description: 'User archived successfully',
    },
  },
});

export const archiveUserRouteHandler: AppRouteHandler<typeof archiveUserRoute> = async c => {
  const dbClient = c.get('dbClient');
  const param = c.req.valid('param');

  const archivedUser = await updateUserData({
    dbClient,
    id: param.user_id,
    values: { deleted_at: sql`NOW()` as unknown as Date },
  });

  return c.json(archivedUser, { status: 200 });
};
