
## Overview

예약 시스템 초안.

예약 시스템의 Core, 객체지향적 설계 고도화하여 Production MVP 수준의 운영 가능한 시스템을 만드는 것을 목표로 삼는다. 



1차 목표:

- Data-Model, Database.sql

    Table:

        - users
        - reservable_resources
        - reservation_slots
        - reservations

- Domain Entity method, relation

    Domain:

        - enum: ReservationStatus
        - entity: ReservationSlots
        - entity: Reservations

- Usecase
    - CreateReservationUsecase
    - CancelReservationByUserUsecase

- Observability

    - Structured Log
    - Trace
    - Metrics
    - Audit


2차 목표:

- User, Auth
- Reservable_Resources Creat, Update
