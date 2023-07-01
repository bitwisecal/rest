import pick from '../utils/pick';
import { ApiError, MEMBER_NOT_FOUND } from '../errors';
import catchAsync from '../utils/catchAsync';
import { workerService } from '../services';
import logger from '../config/logger';

// add logging where needed

// controller to get worker shifts by id
const getWorkerShifts = catchAsync(async (req, res) => {
  // check if the worker is active
  const workerDetails = await workerService.getWorkerById(req.params.workerId);

  if (!workerDetails) {
    logger.error('Worker not found with the ID ', req.params.workerId);
    throw new ApiError(
      MEMBER_NOT_FOUND,
      `Worker with the ID ${req.params.workerId} doesn't exist in the systems`
    );
  }

  if (!workerDetails.workerIsActive) {
    logger.error('Worker is not active. No Shifts are eligible');
    throw new ApiError(MEMBER_NOT_FOUND, 'Worker is not active. No Shifts are eligible');
  }

  logger.info(
    `Worker with given ID ${req.params.workerId} is active and fetching the eligible shifts`
  );

  const options = pick(req.query, ['limit', 'page']);

  const limit = options.limit ? parseInt(options.limit as string) : 20;
  const page = options.page ? parseInt(options.page as string) : 1;

  const workerShifts = await workerService.getShiftsById(req.params.workerId, { limit, page });

  workerShifts['page'] = page;
  workerShifts['limit'] = limit;

  logger.info(`Worker shifts fetched successfully with workerID :  ${req.params.workerId}`);

  res.send({
    code: 200,
    message: 'Successfully Retrieved',
    data: workerShifts
  });
});

// controller to get worker details by id
const getWorkerDetails = catchAsync(async (req, res) => {
  const workerDetails = await workerService.getWorkerById(req.params.workerId);

  logger.info('Worker Details', workerDetails);

  if (!workerDetails) {
    logger.error('Worker not found with teh ID ', req.params.workerId);
    throw new ApiError(
      MEMBER_NOT_FOUND,
      `Worker with the ID ${req.params.workerId} doesn't exist in the systems`
    );
  }
  res.send(workerDetails);
});

export default {
  getWorkerShifts,
  getWorkerDetails
};
