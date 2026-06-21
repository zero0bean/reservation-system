
export class ReservationSlot {
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
    haveRemaining(): boolean { 
        return this.remaining > 0
    }
    isExpired(now: Date): boolean {
        // 영화관은 영화가 시작해도 자리 예매하고 들어갈 수 있음 - endAt으로 비교
        // 현재 코드에서는 startAt으로 비교해서, 시작 시간이 지나면 예약 불가능
        return now.getTime() >= this.startAt.getTime(); 
    }
}