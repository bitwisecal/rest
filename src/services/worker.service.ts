import { workerDao } from '../dao';
import logger from '../config/logger';

// service to get worker details by id
const getWorkerById = async (workerId: number) => {
  const worker = await workerDao.getWorkerDetailsById(workerId);
  logger.info(`Worker Details`, worker);

  return worker;
};

// service to get worker shifts by id
const getShiftsById = async (
  workerId: number,
  options: {
    limit: number;
    page: number;
  }
) => {
  const { limit, page } = options;
  const offset = (page - 1) * limit;

  return await workerDao.getEligibleShiftsByWorkerId(workerId, limit, offset);
};

export default {
  getShiftsById,
  getWorkerById
};
