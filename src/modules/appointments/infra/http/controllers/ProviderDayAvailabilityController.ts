import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderMonthAvailabilityController {
  public async listDayAvailability(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const provider_id = request.params.provider_id;
    const { day, month, year } = request.body;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await listProviderDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.status(201).json({ availability });
  }
}

export default ProviderMonthAvailabilityController;
