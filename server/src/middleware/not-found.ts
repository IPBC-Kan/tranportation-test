import { NextFunction, Request, Response } from 'express';

class NotFound {
    private extractPathFrom(req: Request) {
        return [req.originalUrl, req.hostname];
    }

    private formatRoute(originalUrl: string, hostname: string) {
        return `${hostname} :${3002} ${originalUrl}`;
    }

    handler(req: Request, res: Response, next: NextFunction) {
        const [originalUrl, hostname] = this.extractPathFrom(req);
        const route = this.formatRoute(originalUrl, hostname);
        res.status(404).send({ message: 'route not found', route });
    }
}

const notFound = new NotFound();

export default notFound.handler;
