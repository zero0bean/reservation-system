import crypto from 'node:crypto';

enum ReservationStatus {
    PENDING= "PENDING",
    CONFIRM= "CONFIRM",
    CANCEL= "CANCEL",
    NOSHOW= "NOSHOW",
    COMPLETE= "COMPLETE",
    EXPIRED= "EXPIRED",
}

export class Reservation {
    constructor(
        public readonly id: string,
        public readonly slotId: string,
        private status: ReservationStatus,
        private createdAt: Date,
        private updatedAt: Date
    ) { }

    static create(slotId: string): Reservation {
        return new Reservation(
            crypto.randomUUID(),
            slotId,
            ReservationStatus.PENDING,
            new Date(),
            new Date()
        )
    }

    markConfirm() {
        if (this.status !== ReservationStatus.PENDING) {
            throw new Error(`ReservationStateConflictError - ${this.status} can't be confirmed`);
        }
        this.status = ReservationStatus.CONFIRM
    }


}