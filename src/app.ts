import express,{ Application } from 'express';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import path from 'path';
//Routes
import IndexRoutes from "./routes/routes";
import PostRoutes from "./routes/post.routers";
import { urlencoded } from 'body-parser';

export class App{

    app:Application;

    constructor(private port? : number | string){
        this.app = express();
        this.setting();
        this.middlewares();
        this.routes();
    }

    setting(){
        this.app.set('port',this.port || process.env.port || 3000);
        this.app.set('views',path.join(__dirname,'views'));
        this.app.engine('.hbs',exphbs({
            layoutsDir: path.join(this.app.get('views'),'layouts'),
            partialsDir: path.join(this.app.get('views'),'partials'),
            defaultLayout: 'main',
            extname: '.hbs'
        }));
        this.app.set('view engine','.hbs');
    }

    middlewares(){
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended : false}));
    }

    routes(){
        this.app.use(IndexRoutes);
        this.app.use('/posts',PostRoutes);
        this.app.use('/tasks',PostRoutes);
        this.app.use(express.static(path.join(__dirname,'public')));
    }

    async listen(){
        await this.app.listen(this.app.get('port'));
        console.log('Server on port',this.app.get('port'));
    }
}