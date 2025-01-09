import { log } from "console";
import { Request, Response } from "express";

const todos = [
    { id: 1, text: 'Buy milk', completedAt: new Date()},
    { id: 2, text: 'Buy bread', completedAt: new Date()},
    { id: 3, text: 'Buy eggs', completedAt: null},
    { id: 4, text: 'Buy sugar', completedAt: new Date()}

];


export class TodosController {

    //* DI
    constructor() {

    }
    public getTodos = (req: Request, res: Response) => {
        return res.json(todos);
    };

    public getTodoById = (req: Request, res: Response) => {

        const id = +req.params.id;

        if (isNaN(id)) return res.status(400).json({ message: 'Id must be a number' });

        const todo = todos.find(todo => todo.id === id);

        if (!todo) return res.status(404).json({ message: `Todo not found with id ${id}` });

        return res.json(todo);
    }

    public createTodo = (req: Request, res: Response) => {

        const { text } = req.body;

        if (!text) return res.status(400).json({ message: 'text is required' });

        const newTodo = {
            id: todos.length + 1,
            text,
            completedAt: new Date(),
            completed: false
        }

        todos.push(newTodo);

        res.json(newTodo);


    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) return res.status(400).json({ message: 'Id must be a number' });

        const todo = todos.find(todo => todo.id === id);

        if (!todo) return res.status(404).json({ message: `Todo not found with id ${id}` });

        const { text, completedAt } = req.body;



        if (!text) return res.status(400).json({ message: 'text is required' });

        todo.text = text || todo.text;

        (completedAt === 'null') 
        ? todo.completedAt = null 
        : todo.completedAt = new Date(completedAt || todo.completedAt);

        return res.json(todo);
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        const todo = todos.find(todo => todo.id === id);

        if (!todo) return res.status(404).json({ message: `Todo not found with id ${id}` });

        if (isNaN(id)) return res.status(400).json({ message: 'Id must be a number' });
        
        const todoIndex = todos.findIndex(todo => todo.id === id);

        todos.splice(todoIndex, 1);

        return res.json({ message: 'Todo deleted',
            todo
         });

    }
}