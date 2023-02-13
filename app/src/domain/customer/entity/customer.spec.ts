// dependências
import Address from "../value-object/address";
import Customer from "./customer";

// criando a suíte de testes unitários
describe("Customer unit tests", () => {
  // se um customer é criado sem id, é lançado um erro padrão
  it("should throw error when id is empty", () => {
    expect(() => {
      const customer = new Customer("", "John");
    }).toThrowError("Id is required");
  });

  // se um customer é criado sem name, é lançado um erro padrão
  it("should throw error when name is empty", () => {
    expect(() => {
      const customer = new Customer("123", "");
    }).toThrowError("Name is required");
  });

  // o método changename() deve ser capaz de atualizar somente o name
  it("should change name", () => {
    // Arrange (preparando os dados)
    const customer = new Customer("1", "Customer 1");

    // Act (executando as funções a serem avaliadas)
    customer.changeName("Jane");

    // Assert (testando os resultados)
    expect(customer.id).toBe("1");
    expect(customer.name).toBe("Jane");
    expect(customer.address).toBe(undefined);
    expect(customer.isActive()).toBe(false);
    expect(customer.rewardPoints).toBe(0);
  });

  // o método changeAddress() deve ser capaz de atualizar somente o address
  it("should change address", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");

    customer.changeAddress(address);

    expect(customer.id).toBe("1");
    expect(customer.name).toBe("Customer 1");
    expect(customer.address).toBe(address);
    expect(customer.isActive()).toBe(false);
    expect(customer.rewardPoints).toBe(0);
  });

  // se um customer é ativado sem address, é lançado um erro padrão
  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  // o método activate() deve ser capaz de atualizar somente o active para true
  it("should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.changeAddress(address);

    customer.activate();

    expect(customer.id).toBe("1");
    expect(customer.name).toBe("Customer 1");
    expect(customer.address).toBe(address);
    expect(customer.isActive()).toBe(true);
    expect(customer.rewardPoints).toBe(0);
  });

  // o método deactivate() deve ser capaz de atualizar somente o active para false
  it("should deactivate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.changeAddress(address);
    customer.activate();

    customer.deactivate();

    expect(customer.id).toBe("1");
    expect(customer.name).toBe("Customer 1");
    expect(customer.address).toBe(address);
    expect(customer.isActive()).toBe(false);
    expect(customer.rewardPoints).toBe(0);
  });

  // se tentar adicionar rewardPoints negativos, é lançado um erro padrão
  it("should throw error when trying to add negative reward points", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");
      customer.addRewardPoints(-10);
    }).toThrowError("Points must be a positive number");
  });

  // o método addRewardPoints() deve ser capaz somente de incrementar o rewardPoints
  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.changeAddress(address);

    expect(customer.id).toBe("1");
    expect(customer.name).toBe("Customer 1");
    expect(customer.address).toBe(address);
    expect(customer.isActive()).toBe(false);
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);

    expect(customer.id).toBe("1");
    expect(customer.name).toBe("Customer 1");
    expect(customer.address).toBe(address);
    expect(customer.isActive()).toBe(false);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);

    expect(customer.id).toBe("1");
    expect(customer.name).toBe("Customer 1");
    expect(customer.address).toBe(address);
    expect(customer.isActive()).toBe(false);
    expect(customer.rewardPoints).toBe(20);
  });
});
