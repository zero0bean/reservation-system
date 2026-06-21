import { Reservation }  from '../../domain/reservation';
import type { ReservationRepository } from '../../application/port/reservation-repository';
export class InMemoryReservationRepository implements ReservationRepository {
    private reservations: Reservation[] = [];
    consturctor () { }

    async save(reservation: Reservation): Promise<void> {
        this.reservations.push(reservation);
    }
}