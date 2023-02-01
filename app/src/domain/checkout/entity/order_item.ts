// classe de domínio
export default class OrderItem {
  // definindo os atributos
  private _id: string;
  private _productId: string; // como Product faz parte de outro agregado, somente vincula o id
  private _name: string;
  private _price: number;
  private _quantity: number;

  // definindo o construtor com os atributos mínimos necessários
  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number
  ) {
    this._id = id;
    this._productId = productId;
    this._name = name;
    this._price = price;
    this._quantity = quantity;

    // autovalidação de consistência
    this.validate();
  }

  // getters (somente necessários)
  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get productId(): string {
    return this._productId;
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price * this._quantity;
  }

  // método de autovalidação de consistência
  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._productId.length === 0) {
      throw new Error("ProductId is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._price <= 0) {
      throw new Error("Price must be greater than 0");
    }
    if (this._quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }
  }
}
