import { Pool } from "pg";

class TurmaModel {
  static pool = new Pool({
    ssl: {
      rejectUnauthorized: false,
    },
    connectionString: process.env.DATABASE_URL,
  });

  cpf: string;
  escola: string;
  serie: string;
  ano: number;
  nome: string;
  turno: string;
  quantidadeAlunos: number;

  constructor(data: any = {}) {
    this.cpf = data.cpf || undefined;
    this.escola = data.escola || undefined;
    this.serie = data.serie || undefined;
    this.ano = data.ano || undefined;
    this.nome = data.nome || undefined;
    this.turno = data.turno || undefined;
    this.quantidadeAlunos = data.quantidadeAlunos || 0;
  }

  static async findByCPF(cpf: string): Promise<TurmaModel | undefined> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM turmas
      WHERE cpf = $1
    `,
      [cpf]
    );
    return result.rows[0] ? new TurmaModel(result.rows[0]) : undefined;
  }

  static async findAll(): Promise<TurmaModel[]> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM turmas
    `
    );
    return result.rows.map((data: any) => new TurmaModel(data));
  }

  static async save(turma: TurmaModel): Promise<TurmaModel> {
    await this.pool.query(
      `
      INSERT INTO turmas (
        cpf,
        escola,
        serie,
        ano,
        nome,
        turno,
        quantidadeAlunos
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
      [
        turma.cpf,
        turma.escola,
        turma.serie,
        turma.ano,
        turma.nome,
        turma.turno,
        turma.quantidadeAlunos,
      ]
    );
    return turma;
  }

  static async update(turma: TurmaModel): Promise<TurmaModel> {
    await this.pool.query(
      `
      UPDATE turmas
      SET
        escola = $1,
        serie = $2,
        ano = $3,
        nome = $4,
        turno = $5,
        quantidadeAlunos = $6
      WHERE cpf = $7
    `,
      [
        turma.escola,
        turma.serie,
        turma.ano,
        turma.nome,
        turma.turno,
        turma.quantidadeAlunos,
        turma.cpf,
      ]
    );
    return turma;
  }

  static async deleteByCPF(cpf: string): Promise<void> {
    await this.pool.query("DELETE FROM turmas WHERE cpf = $1", [cpf]);
  }
}

export default TurmaModel;
