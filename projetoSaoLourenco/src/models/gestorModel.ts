import { Pool } from "pg";

class GestorModel {
  static pool = new Pool({
    ssl: {
      rejectUnauthorized: false,
    },
    connectionString: process.env.DATABASE_URL,
  });

  cpf?: string;
  nome?: string;
  escola?: string;
  funcao?: string;
  telefones?: string[];
  login?: string;

  constructor(data: any = {}) {
    this.cpf = data.cpf || undefined;
    this.nome = data.nome || undefined;
    this.escola = data.escola || undefined;
    this.funcao = data.funcao || undefined;
    this.telefones = data.telefones || [];
    this.login = data.login || undefined;
  }

  static async findByCPF(cpf: string): Promise<GestorModel | undefined> {
    const result = await this.pool.query(
      `
        SELECT *
        FROM gestores
        WHERE cpf = $1
      `,
      [cpf]
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
          cpf,
          nome,
          escola,
          funcao,
          telefones,
          login
        )
        VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
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
          nome = $1,
          escola = $2,
          funcao = $3,
          telefones = $4,
          login = $5
        WHERE cpf = $6
      `,
      [
        gestor.nome,
        gestor.escola,
        gestor.funcao,
        gestor.telefones,
        gestor.login,
        gestor.cpf,
      ]
    );
    return gestor;
  }

  static async deleteByCPF(cpf: string): Promise<void> {
    await this.pool.query("DELETE FROM gestores WHERE cpf = $1", [cpf]);
  }
}

export default GestorModel;
