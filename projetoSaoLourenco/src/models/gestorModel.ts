import { Pool } from "pg";

class GestorModel {
  static pool = new Pool({
    ssl: {
      rejectUnauthorized: false,
    },
    connectionString: process.env.DATABASE_URL,
  });

  id?: string;
  cpf?: string;
  nome?: string;
  escola?: string;
  funcao?: string;
  telefones?: string[];
  login?: string;

  constructor(data: any = {}) {
    this.id = data.id || undefined;
    this.cpf = data.cpf || undefined;
    this.nome = data.nome || undefined;
    this.escola = data.escola || undefined;
    this.funcao = data.funcao || undefined;
    this.telefones = data.telefones || [];
    this.login = data.login || undefined;
  }

  static async findById(id: string): Promise<GestorModel | undefined> {
    const result = await this.pool.query(
      `
        SELECT *
        FROM gestores
        WHERE id = $1
      `,
      [id]
    );
    return result.rows[0] ? new GestorModel(result.rows[0]) : undefined;
  }

  static async findAll(): Promise<GestorModel[]> {
    const result = await this.pool.query(
      `
        SELECT *
        FROM gestores
      `
    );
    return result.rows.map((data: any) => new GestorModel(data));
  }

  static async save(gestor: GestorModel): Promise<GestorModel> {
    await this.pool.query(
      `
        INSERT INTO gestores (
          id,
          cpf,
          nome,
          escola,
          funcao,
          telefones,
          login
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      [
        gestor.id,
        gestor.cpf,
        gestor.nome,
        gestor.escola,
        gestor.funcao,
        gestor.telefones,
        gestor.login,
      ]
    );
    return gestor;
  }

  static async update(gestor: GestorModel): Promise<GestorModel> {
    await this.pool.query(
      `
        UPDATE gestores
        SET
          cpf = $1,
          nome = $2,
          escola = $3,
          funcao = $4,
          telefones = $5,
          login = $6
        WHERE id = $7
      `,
      [
        gestor.cpf,
        gestor.nome,
        gestor.escola,
        gestor.funcao,
        gestor.telefones,
        gestor.login,
        gestor.id,
      ]
    );
    return gestor;
  }

  static async excluirPorId(id: string): Promise<void> {
    await this.pool.query("DELETE FROM gestores WHERE id = $1", [id]);
  }
}

export default GestorModel;
