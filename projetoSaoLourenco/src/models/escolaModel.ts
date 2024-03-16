import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();
class EscolaModel {
  static pool = new Pool({
    ssl: {
      rejectUnauthorized: false,
    },
    connectionString: process.env.DATABASE_URL,
  });

  id: string;
  nome: string;
  gestor: string;
  quantidadeAlunos: number;
  series: string[];
  turmas: string[];
  regiao: string;
  possuiAlunoComDeficiencia: boolean;

  constructor(data: any) {
    this.id = data.id || undefined;
    this.nome = data.nome || undefined;
    this.gestor = data.gestor || undefined;
    this.quantidadeAlunos = data.quantidadeAlunos || 0;
    this.series = data.series || [];
    this.turmas = data.turmas || [];
    this.regiao = data.regiao || undefined;
    this.possuiAlunoComDeficiencia = data.possuiAlunoComDeficiencia || false;
  }

  static async findById(id: string): Promise<EscolaModel | undefined> {
    const result = await this.pool.query(
      `
        SELECT *
        FROM escolas
        WHERE id = $1
      `,
      [id]
    );
    return result.rows[0] ? new EscolaModel(result.rows[0]) : undefined;
  }

  static async findAll(): Promise<EscolaModel[]> {
    const result = await this.pool.query(
      `
        SELECT *
        FROM escolas
      `
    );
    return result.rows.map((data: any) => new EscolaModel(data));
  }

  static async save(escola: EscolaModel): Promise<EscolaModel> {
    await this.pool.query(
      `
        INSERT INTO escolas (
            id,
            nome,
            gestor,
            quantidadeAlunos,
            series,
            turmas,
            regiao,
            possuiAlunoComDeficiencia
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        escola.id,
        escola.nome,
        escola.gestor,
        escola.quantidadeAlunos,
        escola.series,
        escola.turmas,
        escola.regiao,
        escola.possuiAlunoComDeficiencia,
      ]
    );
    return escola;
  }

  static async update(escola: EscolaModel): Promise<EscolaModel> {
    await this.pool.query(
      `
        UPDATE escolas
        SET
            nome = $1,
            gestor = $2,
            quantidadeAlunos = $3,
            series = $4,
            turmas = $5,
            regiao = $6,
            possuiAlunoComDeficiencia = $7
        WHERE id = $8
      `,
      [
        escola.nome,
        escola.gestor,
        escola.quantidadeAlunos,
        escola.series,
        escola.turmas,
        escola.regiao,
        escola.possuiAlunoComDeficiencia,
        escola.id,
      ]
    );
    return escola;
  }

  static async excluirPorId(id: string): Promise<void> {
    await this.pool.query("DELETE FROM escolas WHERE id = $1", [id]);
  }
}

export default EscolaModel;
