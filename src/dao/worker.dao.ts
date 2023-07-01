import knex from '../db/client';
import {
  WORKER_TABLE,
  WORKER_FIELDS_MAP,
  SHIFT_FIELDS_MAP,
  SHIFT_TABLE,
  DOCUMENT_FIELDS_MAP,
  DOCUMENT_TABLE,
  DOCUMENT_WORKER_FIELDS_MAP,
  DOCUMENT_WORKER_TABLE,
  FACILITY_FIELDS_MAP,
  FACILITY_REQUIREMENT_FIELDS_MAP,
  FACILITY_REQUIREMENT_TABLE,
  FACILITY_TABLE
} from '../db/constants';

const getWorkerDetailsById = async (id: number) => {
  const worker = await knex(WORKER_TABLE)
    .select(
      `${WORKER_FIELDS_MAP.id} as workerId`,
      `${WORKER_FIELDS_MAP.name} as workerName`,
      `${WORKER_FIELDS_MAP.is_active} as workerIsActive`,
      `${WORKER_FIELDS_MAP.profession} as workerProfession`
    )
    .where(`${WORKER_FIELDS_MAP.id}`, id)
    .first();
  return worker;
};

const getEligibleShiftsByWorkerId = async (workerId: number, limit: number, offset: number) => {
  const [count, shifts] = await Promise.all([
    getQuery(workerId).count(),
    getQuery(workerId)
      .select(
        `${SHIFT_FIELDS_MAP.id} as shiftId`,
        `${SHIFT_FIELDS_MAP.facility_id} as facilityId`,
        `${FACILITY_FIELDS_MAP.name} as facilityName`,
        `${SHIFT_FIELDS_MAP.start} as startDate`,
        `${SHIFT_FIELDS_MAP.end} as endDate`,
        `${SHIFT_FIELDS_MAP.profession} as profession`
      )
      .orderBy(`${SHIFT_FIELDS_MAP.start}`, 'desc')
      .limit(limit)
      .offset(offset)
  ]);
  return {
    totalCount: count[0].count,
    shifts
  };
};

// select *
// from "Shift" inner join "Facility"  on "Shift".facility_id = "Facility".id
// where
// "Facility".is_active  = true and
// "Shift".is_deleted = false and
// "Shift".worker_id isnull and
// "Shift"."profession" in
//  (
// 	      select "Worker"."profession"  from "Worker"  where "Worker".id = 10
//  ) and
// "Shift".facility_id in (
// 		select  distinct "Facility".id
// 		from "Facility", "FacilityRequirement", "Document"
// 		where
// 		"Facility".is_active = true and
// 		"Facility".id = "FacilityRequirement".facility_id and
// 		"FacilityRequirement".document_id = "Document".id and
// 		"Document".is_active = true and
// 		"Document".id in (
// 				 select distinct  "Document".id
// 				 from "Document"  , "DocumentWorker"
// 				 where "DocumentWorker".worker_id = 10 and
// 				 "Document".id = "DocumentWorker".document_id and
// 				 "Document".is_active = true
// 		)

// )

const getQuery = (workerId: number) =>
  knex(SHIFT_TABLE)
    .innerJoin(FACILITY_TABLE, SHIFT_FIELDS_MAP.facility_id, FACILITY_FIELDS_MAP.id)
    .where(FACILITY_FIELDS_MAP.is_active, true)
    .andWhere(SHIFT_FIELDS_MAP.is_deleted, false)
    .andWhere(SHIFT_FIELDS_MAP.worker_id, null)
    .andWhere(SHIFT_FIELDS_MAP.profession, 'in', function () {
      this.select(WORKER_FIELDS_MAP.profession)
        .from(WORKER_TABLE)
        .where(WORKER_FIELDS_MAP.id, workerId);
    })
    .andWhere(SHIFT_FIELDS_MAP.facility_id, 'in', function () {
      this.distinct(FACILITY_FIELDS_MAP.id)
        .from(FACILITY_TABLE)
        .innerJoin(
          FACILITY_REQUIREMENT_TABLE,
          FACILITY_FIELDS_MAP.id,
          FACILITY_REQUIREMENT_FIELDS_MAP.facility_id
        )
        .innerJoin(
          DOCUMENT_TABLE,
          FACILITY_REQUIREMENT_FIELDS_MAP.document_id,
          DOCUMENT_FIELDS_MAP.id
        )
        .where(FACILITY_FIELDS_MAP.is_active, true)
        .andWhere(DOCUMENT_FIELDS_MAP.is_active, true)
        .andWhere(DOCUMENT_FIELDS_MAP.id, 'in', function () {
          this.distinct(DOCUMENT_FIELDS_MAP.id)
            .from(DOCUMENT_TABLE)
            .innerJoin(
              DOCUMENT_WORKER_TABLE,
              DOCUMENT_FIELDS_MAP.id,
              DOCUMENT_WORKER_FIELDS_MAP.document_id
            )
            .where(DOCUMENT_WORKER_FIELDS_MAP.worker_id, workerId)
            .andWhere(DOCUMENT_FIELDS_MAP.is_active, true);
        });
    });

export default {
  getWorkerDetailsById,
  getEligibleShiftsByWorkerId
};
