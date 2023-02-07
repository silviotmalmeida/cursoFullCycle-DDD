// interface a ser implementada pelos repositories
export default interface RepositoryInterface<T> {
    
    // métodos obrigatórios
    create(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    find(id: string): Promise<T>;
    findAll(): Promise<T[]>;
}