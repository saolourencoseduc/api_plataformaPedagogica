import { Pool } from "pg";

class AlunoModel {
  static pool = new Pool({
    ssl: {
      rejectUnauthorized: false,
    },
    connectionString: process.env.DATABASE_URL,
  });

  id: string;
  unidadeEscolar: string;
  regiaoEscola: string;
  serie: string;
  turma: string;
  nomeCompleto: string;
  estudanteComDeficiencia: boolean;
  deficiencia: string;
  cartaoRespostaPortuguesa: string;
  cartaoRespostaMatematica: string;

  constructor(data: any) {
    this.id = data.id || undefined;
    this.unidadeEscolar = data.unidadeEscolar || undefined;
    this.regiaoEscola = data.regiaoEscola || undefined;
    this.serie = data.serie || undefined;
    this.turma = data.turma || undefined;
    this.nomeCompleto = data.nomeCompleto || undefined;
    this.estudanteComDeficiencia = data.estudanteComDeficiencia || undefined;
    this.deficiencia = data.deficiencia || undefined;
    this.cartaoRespostaPortuguesa = data.cartaoRespostaPortuguesa || undefined;
    this.cartaoRespostaMatematica = data.cartaoRespostaMatematica || undefined;
  }

  static async findById(id: string): Promise<AlunoModel | undefined> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM alunos
      WHERE id = $1
    `,
      [id]
    );
    return result.rows[0] ? new AlunoModel(result.rows[0]) : undefined;
  }

  static async findAll(): Promise<AlunoModel[]> {
    const result = await this.pool.query(
      `
      SELECT *
      FROM alunos
    `
    );
    return result.rows.map((data: any) => new AlunoModel(data));
  }

  static async save(aluno: AlunoModel): Promise<AlunoModel> {
    await this.pool.query(
      `
      INSERT INTO alunos (
        id,
        unidadeEscolar,
        regiaoEscola,
        serie,
        turma,
        nomeCompleto,
        estudanteComDeficiencia,
        deficiencia,
        cartaoRespostaPortuguesa,
        cartaoRespostaMatematica
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `,
      [
        aluno.id,
        aluno.unidadeEscolar,
        aluno.regiaoEscola,
        aluno.serie,
        aluno.turma,
        aluno.nomeCompleto,
        aluno.estudanteComDeficiencia,
        aluno.deficiencia,
        aluno.cartaoRespostaPortuguesa,
        aluno.cartaoRespostaMatematica,
      ]
    );
    return aluno;
  }

  static async update(aluno: AlunoModel): Promise<AlunoModel> {
    await this.pool.query(
      `
      UPDATE alunos
      SET
        unidadeEscolar = $1,
        regiaoEscola = $2,
        serie = $3,
        turma = $4,
        nomeCompleto = $5,
        estudanteComDeficiencia = $6,
        deficiencia = $7,
        cartaoRespostaPortuguesa = $8,
        cartaoRespostaMatematica = $9
      WHERE id = $10
    `,
      [
        aluno.unidadeEscolar,
        aluno.regiaoEscola,
        aluno.serie,
        aluno.turma,
        aluno.nomeCompleto,
        aluno.estudanteComDeficiencia,
        aluno.deficiencia,
        aluno.cartaoRespostaPortuguesa,
        aluno.cartaoRespostaMatematica,
        aluno.id,
      ]
    );
    return aluno;
  }

  static async excluirPorId(id: string): Promise<void> {
    await this.pool.query("DELETE FROM alunos WHERE id = $1", [id]);
  }
}

export default AlunoModel;
