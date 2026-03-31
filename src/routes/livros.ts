import { Request, Response, Router } from "express";
import { db } from "../db";

const router = Router()

router.get("/", (_, res: Response) => {
    // db.get retorna apenas um registro 
    db.all("SELECT * FROM livros", (err, rows) => {
        if (err) {
            return res.status(500).json({
                erro: "Erro ao buscar livros"
            })
        } 
        res.json(rows)
    });

})

router.post("/", (req: Request, res: Response) => {
    const {titulo, autores}= req.body
    db.run("INSERT INTO livros (titulo, autores) VALUES (?, ?)", [titulo, autores], function (err) {
        if (err) {
            return res.status(500).json({
                erro: "Erro ao cadastrar livro"
            }) 
        }
        res.status(201).json({
            id: this.lastID,
            titulo,
            autores
        })
    })
    
})

router.put("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const {titulo, autores} = req.body

    db.run("UPDATE livros SET titulo = ?, autores = ? WHERE id = ?", [titulo, autores, id], function(err) {
        if(err) {
            return res.status(500).json({
                erro: "Erro ao atualizar livro"
            })
        }
        if (this.changes === 0) {
            return res.status(404).json({
                erro: "Livro não encontrado"
            })
       }
       res.json({
        id,
        titulo,
        autores
       })
    })

    
} )

export default router