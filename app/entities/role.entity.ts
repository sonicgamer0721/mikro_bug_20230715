import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';

import { RoleResourcePermission } from './role-resource-permission.entity';
import { User } from './user.entity';

@Entity({ tableName: 'core_roles' })
export class Role {
  @PrimaryKey()
  id!: number;

  @Unique()
  @Property()
  name!: string;

  @ManyToMany(() => User, (user) => user.roles, { owner: true })
  users = new Collection<User>(this);

  @OneToMany(
    () => RoleResourcePermission,
    (roleResourcePermission) => roleResourcePermission.role,
  )
  permissions = new Collection<RoleResourcePermission>(this);
}
