import { Request, Response } from "express";

import { connect } from "../database";
import { Post } from "../interface/post.interface";

export async function getPosts(req: Request, res: Response): Promise<Response>{
    const conn = await connect();
    const posts = await conn.query('SELECT * FROM datauser');
    return res.json(posts[0]);
}

export async function createPost(req: Request, res: Response){
    const newPost: Post = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO datauser SET ?',[newPost]);
    return res.json({
        message: 'Post Created'
    });
}

export async function getPost(req: Request, res: Response): Promise<Response>{
    const id = req.params.postId;
    const conn = await connect();
    const posts = await conn.query('SELECT * FROM datauser WHERE id = ?',[id]);
    return res.json(posts[0]);
}
