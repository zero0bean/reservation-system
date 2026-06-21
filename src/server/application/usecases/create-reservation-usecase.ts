import { randomUUID } from 'node:crypto';

import { ReservationSlot } from '../../domain/reservation-slot';
import { Reservation } from '../../domain/reservation';
import { CreateReservationPolicy } from '../../domain/create-reservation-policy';

import type { ReservationSlotRepository } from '../port/reservation-slot-repository';
import type { ReservationRepository } from '../port/reservation-repository';

type CreateReservationUsecaseCommand = {
    slotId: string;
}

export class CreateReservationUsecase {
    constructor(
        private readonly slotRepository: ReservationSlotRepository,
        private readonly reservationRepository: ReservationRepository
    ) { }

    async execute(command: CreateReservationUsecaseCommand) {     
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
        const slot = await this.slotRepository.findById(command.slotId);
        if (!slot) {
            throw new Error(`존재하지 않는 Slot에는 예약이 불가능합니다`);
        }

        const reservationSlot = new ReservationSlot(
            randomUUID(),
            new Date("2026-06-21T20:00Z"),
            new Date("2026-06-21T21:00Z"),
            5,
            1,
            new Date(),
            new Date(),
        )
        const now = new Date();
        const canCreate = CreateReservationPolicy.canCreate(reservationSlot, now);
        console.log('[canCreate]', canCreate)
        
        if (!canCreate) {
            // 일단 자리 부족으로만 표시하자
            throw new Error(`reservation slot capacity exceeded`);
        }
        console.log('[reservationSlot]', reservationSlot)
        
        const reservation = Reservation.create(reservationSlot.id);
        console.log('[reservation]', reservation)
        
        await this.reservationRepository.save(reservation)
        
        return reservation;
    }
}


