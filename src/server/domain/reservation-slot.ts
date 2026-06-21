
export class ReservationSlots {
    constructor(
        public readonly id: string,
        public readonly startAt: Date,
        public readonly endAt: Date,
        private readonly capacity: number,
        private remaining: number,
        public readonly createdAt: Date,
        public readonly updtaedAt: Date
    ) { }
    canReserve() { }
    reserveOne() { }
    releaseOne() { }
    haveRemaining() { }
    isExpired() { }
}