import { MikroORM, wrap } from '@mikro-orm/core';

import { RoleResourcePermission } from './entities/role-resource-permission.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';

import type { SqliteDriver } from "@mikro-orm/sqlite";
async function bootstrap() {
  const orm = await MikroORM.init<SqliteDriver>({
    entities: ["dist/**/*.entity.js"],
    dbName: "test.db",
    type: "sqlite",
    debug: true,
  });
  await orm.getSchemaGenerator().updateSchema();
  const em = orm.em.fork();

  // BUG 1
  const users = await em.find(User, { id: 1 }, { populate: ["roles"] });
  console.log(users[0].roles);

  // The user[0].roles shows empty, but not updated in database.
  wrap(users[0]).assign({
    roles: [].map((id) => em.getReference(Role, id)),
  });
  await em.flush();
  console.log(users[0].roles);

  // BUG 2
  const permission = await em.findOne(
    RoleResourcePermission,
    {
      role: em.getReference(Role, 1),
      resource: 'core_user',
      isOriginal: true,
    },
  );
  // You can see the weird SQL statement("where ((0 = 'c' and 1 = 'o')...") in the console.
  wrap(permission).assign({
    canCreate: 0,
    canRead: 0,
  });
  await em.flush();
}
bootstrap();
