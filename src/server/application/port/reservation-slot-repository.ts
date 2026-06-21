import type { ReservationSlot } from '../../domain/reservation-slot';

export interface ReservationSlotRepository {
    findById(slotId: string): Promise<ReservationSlot | null>;
    update(slot: ReservationSlot): Promise<void>;
}