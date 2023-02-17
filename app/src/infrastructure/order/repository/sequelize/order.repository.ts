// dependências
import Order from "../../../../domain/checkout/entity/order";
import OrderItemModel from "./orderItem.model";
import OrderModel from "./order.model";
import OrderRepositoryInterface from "../../../../domain/checkout/entity/repository/orderRepository.interface";
import OrderItem from "../../../../domain/checkout/entity/orderItem";

// classe de repositório do orm, implementando a interface de repositório definida no domain
export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    // utiliza o método default do orm
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        // include do relacionamento HasMany, reponsável para criar os registros na tabela relacionada
        include: [{ model: OrderItemModel }],
      }
    );
  }

  // método de atualização
  async update(entity: Order): Promise<void> {
    // utiliza o método default do orm
    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  // método de busca por id
  async find(id: string): Promise<Order> {
    // obtendo os dados do bd
    let orderModel;
    // tratamento de exceções
    try {
      // utiliza o método default do orm
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      // em caso de inexistência, lança uma exceção
      throw new Error("Order not found");
    }

    // recriando as entidades do agregado, a partir dos dados do bd

    //// recriando os orderItem do relacionamento
    const items = orderModel.items.map(
      // recriando as entidades do agregado, a partir dos dados do bd
      (orderItemModel) => {
        const orderItem = new OrderItem(
          orderItemModel.id,
          orderItemModel.name,
          orderItemModel.price,
          orderItemModel.product_id,
          orderItemModel.quantity
        );
        return orderItem;
      }
    );

    //// recriando o order
    const order = new Order(id, orderModel.customer_id, items);

    return order;
  }

  // método de busca
  async findAll(): Promise<Order[]> {
    // utiliza o método default do orm
    const orderModels = await OrderModel.findAll();

    //iterando sobre os registros
    const orders = orderModels.map(
      // recriando as entidades do agregado, a partir dos dados do bd
      (orderModel) => {
        //// recriando os orderItem do relacionamento
        const items = orderModel.items.map(
          // recriando as entidades do agregado, a partir dos dados do bd
          (orderItemModel) => {
            const orderItem = new OrderItem(
              orderItemModel.id,
              orderItemModel.name,
              orderItemModel.price,
              orderItemModel.product_id,
              orderItemModel.quantity
            );
            return orderItem;
          }
        );

        //// recriando o order
        const order = new Order(orderModel.id, orderModel.customer_id, items);

        return order;
      }
    );

    return orders;
  }
}
