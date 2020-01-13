import { Router,Request,Response } from "express";
const router = Router();

import { getPosts,createPost} from "../controllers/post.controller";
//import { getPosts,createPost,getPost} from "../controllers/post.controller";

router.route('/')
    .get(getPosts)
    .post(createPost);

router.route('/create')
    .get((req:Request,res:Response) =>{
        res.render('tasks/create')
    })
    .post(createPost);
/*router.route('/:postId')
    .get(getPost);*/

export default router;
