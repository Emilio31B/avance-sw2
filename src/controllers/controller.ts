import { Request, Response } from "express";


export function indexWelcome(req: Request, res: Response){
   //return res.json('Welcome to the jungle');
   return res.render('./partials/index.hbs');
}