import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProvidersMonthAvailabilityService from '@modules/appointments/services/ListProvidersMonthAvailabilityService';

class ProviderMonthAvailabilityController {
  public async listMonthAvailability(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const provider_id = request.params.provider_id;
    const { month, year } = request.query;

    const listProviderDayAvailability = container.resolve(
      ListProvidersMonthAvailabilityService,
    );

    const availability = await listProviderDayAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.status(201).json({ availability });
  }
}

export default ProviderMonthAvailabilityController;
