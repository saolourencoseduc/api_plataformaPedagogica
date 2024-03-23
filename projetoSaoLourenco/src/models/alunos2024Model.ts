import mongoose, { Schema, Document } from 'mongoose';

export interface IAluno2024 extends Document {
  id_alunos: number;
  nome_do_aluno: string;
  cpf: string;
  data_de_nascimento: Date;
  escola: string;
  codigo_inep: string;
  turma: string;
  serie: string;
  curso: string;
  ano: number;
  turno: string;
  nome_da_mae: string;
  nome_do_pai: string;
  nome_responsavel: string;
}

const Aluno2024Schema: Schema = new Schema({
  id_alunos: { type: Number, required: true },
  nome_do_aluno: { type: String, required: true },
  cpf: { type: String, required: true },
  data_de_nascimento: { type: Date, required: true },
  escola: { type: String, required: true },
  codigo_inep: { type: String, required: true },
  turma: { type: String, required: true },
  serie: { type: String, required: true },
  curso: { type: String, required: true },
  ano: { type: Number, required: true },
  turno: { type: String, required: true },
  nome_da_mae: { type: String, required: true },
  nome_do_pai: { type: String, required: true },
  nome_responsavel: { type: String, required: true }
});

export default mongoose.model<IAluno2024>('Aluno2024', Aluno2024Schema);

