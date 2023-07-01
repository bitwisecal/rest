export const WORKER_TABLE = 'Worker';
export const SHIFT_TABLE = 'Shift';
export const FACILITY_TABLE = 'Facility';
export const DOCUMENT_TABLE = 'Document';
export const DOCUMENT_WORKER_TABLE = 'DocumentWorker';
export const FACILITY_REQUIREMENT_TABLE = 'FacilityRequirement';

export const WORKER_FIELDS_MAP = {
  id: 'Worker.id',
  name: 'Worker.name',
  is_active: 'Worker.is_active',
  profession: 'Worker.profession'
};

export const SHIFT_FIELDS_MAP = {
  id: 'Shift.id',
  start: 'Shift.start',
  end: 'Shift.end',
  profession: 'Shift.profession',
  is_deleted: 'Shift.is_deleted',
  facility_id: 'Shift.facility_id',
  worker_id: 'Shift.worker_id'
};

export const FACILITY_FIELDS_MAP = {
  id: 'Facility.id',
  name: 'Facility.name',
  is_active: 'Facility.is_active'
};

export const DOCUMENT_FIELDS_MAP = {
  id: 'Document.id',
  name: 'Document.name',
  is_active: 'Document.is_active'
};

export const DOCUMENT_WORKER_FIELDS_MAP = {
  id: 'DocumentWorker.id',
  worker_id: 'DocumentWorker.worker_id',
  document_id: 'DocumentWorker.document_id'
};

export const FACILITY_REQUIREMENT_FIELDS_MAP = {
  id: 'FacilityRequirement.id',
  facility_id: 'FacilityRequirement.facility_id',
  document_id: 'FacilityRequirement.document_id'
};
