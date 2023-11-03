import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'DELETE':
      res.status(200).json({ message: 'entrou aqui' });
      break;
    default:
      res.status(501).json({ error: 'método não implementado' });
      break;
  }
}
