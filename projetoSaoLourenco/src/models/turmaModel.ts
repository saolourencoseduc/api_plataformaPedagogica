import { Pool } from "pg";

export class TurmaModel {
  static pool = new Pool({
    ssl: {
      rejectUnauthorized: false,
    },
    connectionString: process.env.DATABASE_URL,
  });

  id: string;
  escola: string;
  serie: string;
  ano: number;
  nome: string;
  turno: string;
  quantidadeAlunos: number;

  constructor(data: any = {}) {
    this.id = data.id || undefined;
    this.escola = data.escola || undefined;
    this.serie = data.serie || undefined;
    this.ano = data.ano || undefined;
    this.nome = data.nome || undefined;
    this.turno = data.turno || undefined;
    this.quantidadeAlunos = data.quantidadeAlunos || 0;
  }

  static async findById(id: string): Promise<TurmaModel | undefined> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM pea
      WHERE id = $1
    `,
      [id]
    );
    return result.rows[0] ? new TurmaModel(result.rows[0]) : undefined;
  }

  static async findAll(): Promise<TurmaModel[]> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM pea
    `
    );
    return result.rows.map((data: any) => new TurmaModel(data));
  }

  static async save(turma: TurmaModel): Promise<TurmaModel> {
    await this.pool.query(
      `
      INSERT INTO pea (
        id,
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
        turma.id,
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
      UPDATE pea
      SET
        escola = $1,
        serie = $2,
        ano = $3,
        nome = $4,
        turno = $5,
        quantidadeAlunos = $6
      WHERE id = $7
    `,
      [
        turma.escola,
        turma.serie,
        turma.ano,
        turma.nome,
        turma.turno,
        turma.quantidadeAlunos,
        turma.id,
      ]
    );
    return turma;
  }

  static async excluirPorId(id: string): Promise<void> {
    await this.pool.query("DELETE FROM pea WHERE id = $1", [id]);
  }
}


export default TurmaModel;
