import { Pool } from 'pg';

class GestorModel {
  static pool = new Pool({
    ssl: {
      rejectUnauthorized: false,
    },
    connectionString: process.env.DATABASE_URL,
  });

  id?: string;
  nome_completo?: string;
  cpf?: string;
  email?: string;
  funcao?: string;
  telefone?: string;
  celular?: string;

  constructor(data: any = {}) {
    this.id = data.id || undefined;
    this.nome_completo = data.nome_completo || undefined;
    this.cpf = data.cpf || undefined;
    this.email = data.email || undefined;
    this.funcao = data.funcao || undefined;
    this.telefone = data.telefone || undefined;
    this.celular = data.celular || undefined;
  }

  static async findById(id: string | null, cpf: string | null, nome: string | null): Promise<GestorModel | undefined> {
    let query = `
      SELECT *
      FROM gestores
      WHERE 1 = 1
    `;
    const values = [];

    if (id) {
      query += ` AND id = $${values.length + 1}`;
      values.push(id);
    }
    if (cpf) {
      query += ` AND cpf = $${values.length + 1}`;
      values.push(cpf);
    }
    if (nome) {
      query += ` AND nome_completo = $${values.length + 1}`;
      values.push(nome);
    }

    const result = await this.pool.query(query, values);
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
          nome_completo,
          cpf,
          email,
          funcao,
          telefone,
          celular
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      [
        gestor.id,
        gestor.nome_completo,
        gestor.cpf,
        gestor.email,
        gestor.funcao,
        gestor.telefone,
        gestor.celular
      ]
    );
    return gestor;
  }

  static async update(gestor: GestorModel): Promise<GestorModel> {
    await this.pool.query(
      `
        UPDATE gestores
        SET
          nome_completo = $1,
          cpf = $2,
          email = $3,
          funcao = $4,
          telefone = $5,
          celular = $6
        WHERE id = $7
      `,
      [
        gestor.nome_completo,
        gestor.cpf,
        gestor.email,
        gestor.funcao,
        gestor.telefone,
        gestor.celular,
        gestor.id,
      ]
    );
    return gestor;
  }

  static async excluirPorId(id: string): Promise<void> {
    await this.pool.query(
      `
        DELETE FROM gestores
        WHERE id = $1
      `,
      [id]
    );
  }

  static async findByCpf(cpf: string): Promise<GestorModel | undefined> {
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

  static async findByNome(nome: string): Promise<GestorModel | undefined> {
    const result = await this.pool.query(
      `
        SELECT *
        FROM gestores
        WHERE nome_completo = $1
      `,
      [nome]
    );
    return result.rows[0] ? new GestorModel(result.rows[0]) : undefined;
  }

  static async deleteByCpf(cpf: string): Promise<void> {
    await this.pool.query(
      `
        DELETE FROM gestores
        WHERE cpf = $1
      `,
      [cpf]
    );
  }

  static async deleteByNome(nome: string): Promise<void> {
    await this.pool.query(
      `
        DELETE FROM gestores
        WHERE nome_completo = $1
      `,
      [nome]
    );
  }
}

export default GestorModel;
