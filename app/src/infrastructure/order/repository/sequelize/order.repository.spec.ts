// dependências
import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/orderItem";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import OrderItemModel from "./orderItem.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";
import ProductModel from "../../../product/repository/sequelize/productModel";
import ProductRepository from "../../../product/repository/sequelize/productRepository";

// criando a suíte de testes unitários
describe("Order repository test", () => {
  // inicializando a variável do orm
  let sequelize: Sequelize;

  // ações que ocorrem antes de cada teste
  beforeEach(async () => {
    // configurando o orm
    sequelize = new Sequelize({
      dialect: "sqlite", // definindo o db
      storage: ":memory:", // definindo que irá gravar em memória
      logging: false, // sem login
      sync: { force: true }, // criar as tabelas ao inicializar o db
    });
    // adicionando as models a serem consideradas na criação das tabelas
    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    // criando o db
    await sequelize.sync();
  });

  // ações que ocorrem após de cada teste
  afterEach(async () => {
    // encerrando o db
    await sequelize.close();
  });

  // se um registro for armazenado no db, seus atributos devem ser iguais aos do objeto de origem
  it("should create a new order", async () => {
    // criando o customer
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    // salvando o customer no db utilizando os métodos do repository
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    // criando o product
    const product = new Product("123", "Product 1", 10);
    // salvando o product no db utilizando os métodos do repository
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    // criando o orderItem
    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    // criando o order
    const order = new Order("123", customer.id, [ordemItem]);
    // salvando o product no db utilizando os métodos do repository
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    // consultando no db utilizando os métodos do orm
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    // comparando-se os dados
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: order.id,
          product_id: product.id,
        },
      ],
    });
  });
});
