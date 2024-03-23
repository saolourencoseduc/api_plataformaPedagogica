import express from 'express';
import escolaRouter from './escolaRoutes';
import turmaRouter from './turmaRoutes';
import alunoRouter from './alunoRoutes';
import gestorRouter from './gestorRoutes';
import alunos2024Router from './alunos2024Routes'; 

const indexRouter = express.Router();

indexRouter.use('/escola', escolaRouter);
indexRouter.use('/turma', turmaRouter);
indexRouter.use('/aluno', alunoRouter);
indexRouter.use('/gestor', gestorRouter);
indexRouter.use('/alunos2024', alunos2024Router); 

export default indexRouter;
