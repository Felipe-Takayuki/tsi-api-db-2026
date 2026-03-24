import { Router, Request, Response } from "express";
import { db } from "../db";
import { Genero } from "../model/genero";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    db.all("SELECT * FROM generos", (erro, linhas) => {
        if(erro) {
            return res.status(500).json(
                {erro: "Erro ao buscar gêneros"}
            );
        }
        res.json(linhas);
    });
});

export default router;