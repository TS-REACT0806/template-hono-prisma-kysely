import { type DbClient } from '@/db/create-db-client';
import { type Product } from '@/db/schema';
import { makeDefaultDataListReturn } from '../make-default-list-return';

export type GetProductsDataArgs = {
  dbClient: DbClient;
  limit?: number;
  page?: number;
  sortBy?: keyof Product;
  orderBy?: 'asc' | 'desc';
  includeArchived?: boolean;
};

export async function getProductsData({
  dbClient,
  limit = 25,
  page = 1,
  sortBy = 'created_at',
  orderBy = 'desc',
  includeArchived = false,
}: GetProductsDataArgs) {
  let baseQuery = dbClient.selectFrom('products');

  if (!includeArchived) {
    baseQuery = baseQuery.where('deleted_at', 'is', null);
  }

  const records = await baseQuery
    .selectAll()
    .limit(limit)
    .offset((page - 1) * limit)
    .orderBy(sortBy, orderBy)
    .execute();

  const allRecords = await baseQuery
    .select(eb => eb.fn.count('id').as('total_records'))
    .executeTakeFirst();

  return makeDefaultDataListReturn({
    records,
    totalRecords: Number(allRecords?.total_records) ?? 0,
    limit,
    page,
  });
}
