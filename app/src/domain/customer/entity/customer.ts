// dependências
import Address from "../value-object/address";

// classe de domínio
export default class Customer {
  // definindo os atributos
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  // definindo o construtor
  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

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

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get Address(): Address {
    return this._address;
  }

  // método de autovalidação de consistência
  validate() {
    // os atributos são obrigatórios
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  // método para alteração do name
  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  // método para alteração do address
  changeAddress(address: Address) {
    this._address = address;
  }

  // método para consulta do active
  isActive(): boolean {
    return this._active;
  }

  // método para alteração do active para true
  activate() {
    // se o address estiver vazio, lança uma exceção
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  // método para alteração do active para false
  deactivate() {
    this._active = false;
  }

  // método para incremento dos rewardPoints
  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
}
