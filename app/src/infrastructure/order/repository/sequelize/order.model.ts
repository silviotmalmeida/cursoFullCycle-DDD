// dependências
import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./orderItem.model";

// definindo as características da tabela no db
@Table({
  tableName: "orders",
  timestamps: false,
})

// classe de modelo do orm
export default class OrderModel extends Model {
  // definindo as colunas e restrições da tabela
  @PrimaryKey
  @Column
  declare id: string;

  // relacionamento com customer
  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customer_id: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  // relacionamento com orderItem
  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];

  @Column({ allowNull: false })
  declare total: number;
}
