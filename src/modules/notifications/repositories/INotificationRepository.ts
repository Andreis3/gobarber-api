import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notifications from '@modules/notifications/infra/typeorm/schemas/Notifications';

export default interface INotificationRepository {
  create(data: ICreateNotificationDTO): Promise<Notifications>;
}
