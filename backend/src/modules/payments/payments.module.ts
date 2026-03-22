import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
// Importamos el módulo de notificaciones para usar su servicio
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule], // Importamos el módulo de notificaciones
  providers: [PaymentsService], // El servicio de pagos ahora puede usar el servicio de notificaciones
  exports: [PaymentsService], // Exportamos el servicio de pagos para que otros módulos puedan usarlo
  controllers: [PaymentsController] // Controlador de pagos
})
export class PaymentsModule {}
