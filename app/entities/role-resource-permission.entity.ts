import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';

import { Role } from './role.entity';

@Entity({ tableName: 'core_role_resources' })
@Unique({ properties: ['role', 'resource', 'isOriginal'] })
export class RoleResourcePermission {
  @ManyToOne(() => Role, {
    primary: true,
    onDelete: 'cascade',
  })
  role!: Role;

  @Property({ primary: true })
  resource!: string;

  @Property({ primary: true })
  isOriginal!: boolean;

  @Property()
  canCreate!: number;

  @Property()
  canRead!: number;
}
