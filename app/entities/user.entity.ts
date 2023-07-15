import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';

import { Role } from './role.entity';

@Entity({ tableName: 'core_users' })
export class User {
  @PrimaryKey()
  id!: number;

  @Unique()
  @Property()
  account!: string;

  @Property()
  name!: string;

  @ManyToMany(() => Role, (role) => role.users)
  roles = new Collection<Role>(this);
}
