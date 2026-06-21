import { ReservationSlot } from './reservation-slot';

export class CreateReservationPolicy {
    
    // 약간의 걱정은 왜 예약할 수 없는지에 대한 내용이 위로 올라가지가 않음
    // const result = CreateReservationPolicy.canCreate
    // result가 false라면 throw new Error를 뭘 해줘야할지를 어떻게 매핑?

    // 아, 아니면 여기서 boolean이 아니라 여기서 throw new ReservationAlreadyExpiredError 같은걸 던지나?
    // 라는 고민은 여기까지하고 일단 내가 시그니쳐 잡은대로 한번 만들어보자
    static canCreate(slot: ReservationSlot, now: Date): boolean {
        // 2. CreateReservationPolicty.canCreate(reservationSlots)
        //      - 해당 슬롯 예약 가능한 상태인지? 
        //         - 이거 일단 생략 status 뭐가 들어올지 모르겠엄
        //      - 이미 지나간 시간은 아닌지
        //      - 자리 예약 가능한지 (남은 자리가 있는지)
        if (slot.isExpired(now)) return false;
        if (!slot.haveRemaining()) return false;
        return true;
    }
}