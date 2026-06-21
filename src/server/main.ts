
import { ReservationSlot } from './domain/reservation-slot';
import { Reservation } from './domain/reservation';
import { CreateReservationPolicy } from './domain/create-reservation-policy';

import { InMemoryReservationRepository } from './infra/persistence/reservation-respository-in-memory';
import { InMemoryReservationSlotRepository } from './infra/persistence/reservation-slot-respository-in-memory';

import { CreateReservationUsecase } from './application/usecases/create-reservation-usecase';

async function main() {
    // create reservation usecase를 한번 상상해보자
    
    /**
     * 1. ReservationSlots를 조회 -> 존재하지 않는 Slot에 예약 불가능
     * 2. CreateReservationPolicty.canCreate(reservationSlots)
     *      - 해당 슬롯 예약 가능한 상태인지?
     *      - 이미 지나간 시간은 아닌지
     *      - 자리 예약 가능한지 (남은 자리가 있는지)
     * 
     * 3. 생성할 수 있다면 ReservationSlots.reserveOne() - 1개 자리 차감
     * 4. Reservation 생성
     * 5. DB 저장
     * 
     */
    const inMemoryReservationRepository = new InMemoryReservationRepository();
    const inMemorySlotRepository = new InMemoryReservationSlotRepository();

    // seeding
    const slot = inMemorySlotRepository.seedOne();
    

    const createReservationUsecase = new CreateReservationUsecase(
        inMemorySlotRepository,
        inMemoryReservationRepository
    );
    
    const result = await createReservationUsecase.execute({
        slotId: slot.id
    })
    console.log('[CreateReservationUsecase/result]', result)
    console.log(inMemoryReservationRepository.all())
    console.log(inMemorySlotRepository.all())
}


main().catch(console.error)