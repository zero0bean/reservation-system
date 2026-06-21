import { randomUUID } from 'node:crypto';

import { ReservationSlot }  from '../../domain/reservation-slot';
import type { ReservationSlotRepository } from '../../application/port/reservation-slot-repository';
export class InMemoryReservationSlotRepository implements ReservationSlotRepository {
    private reservationSlots: ReservationSlot[] = [];
    consturctor () { }

    async findById(slotId: string): Promise<ReservationSlot | null> {
        const idx = this.reservationSlots.findIndex(slot => slot.id === slotId);
        if (idx === -1) return null;
        // warn: same memory reference
        return this.reservationSlots[idx]!;
    }   
    
    async update(slot: ReservationSlot): Promise<void> {
        let _slot = this.findById(slot.id)!;
        _slot = slot;
    }

    seedOne(): ReservationSlot {
        const slot = new ReservationSlot(
            randomUUID(),
            new Date("2026-06-21T20:00Z"),
            new Date("2026-06-21T21:00Z"),
            5,
            1,
            new Date(),
            new Date(),
        )

        this.reservationSlots.push(slot);
        return slot;
    }

    all(): ReservationSlot[] {
        return this.reservationSlots
    }
}