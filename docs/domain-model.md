 
# Modelo de Dominio

## Objetivo
Definir las entidades y reglas fundamentales del sistema
"Asistente Inteligente de Pendientes y Pagos".

## Entidades Principales

### User
Representa al usuario autenticado mediante Google OAuth.

### PaymentAccount
Entidad que agrupa pagos relacionados a una misma fuente
(banco, servicio, suscripción).

### Payment
Representa una obligación de pago con monto y fecha definida.

### RecurrenceRule
Define reglas de repetición de un pago.

### PaymentHistory
Registro histórico e inmutable de pagos ejecutados.
