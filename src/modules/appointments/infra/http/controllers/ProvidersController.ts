import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProviderService from '@modules/appointments/services/ListProviderService';

class ListProviderController {
  public async getAllProvider(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;

    const listProvider = container.resolve(ListProviderService);

    const providers = await listProvider.execute({
      user_id,
    });

    return response.status(200).json({ providers });
  }
}

export default ListProviderController;
