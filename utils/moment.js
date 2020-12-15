import moment from 'moment-timezone';
import { deleteExpiredPendings, updateExpiredSuccess } from '../config/api';
import { deleteMyExpiredPendingMatches, moveFromSuccessToPast } from '../actions'

export const getExpiredPending = (waitingMatch, userId, dispatch) => {

  const now = moment();
  const expired = [];

  waitingMatch.forEach(match => {
    const remaining = moment(match.startAt).diff(now);

    if (remaining <= 0) {// 3600000
      expired.push(match._id);
    }
  });

  if (expired.length) {
    deleteExpiredPendings(userId, expired);
    dispatch(deleteMyExpiredPendingMatches(expired));
  }

  return expired;
};

export const getExpiredSuccess = async (successMatch, dispatch) => {

  const now = moment();
  const expired = [];

  successMatch.forEach(async match => {
    const remaining = moment(match.expireAt).diff(now);

    if (remaining <= 0) {
      expired.push(match._id);
      const updatedMatch = await updateExpiredSuccess(match._id);
      dispatch(moveFromSuccessToPast(updatedMatch));
    }
  });

  return expired;
};

export const filterExpiredMatch = allPendingMatch => {

  const now = moment();

  const filtered = allPendingMatch.filter(pending => {
    const remaining = moment(pending.startAt).diff(now);
    return remaining >= 0;//3600000
  });

  return filtered;
};

export const calculateRemaingMiliSeconds = (targetDateAndTime) => {
  const now = moment();
  const target = moment(targetDateAndTime);

  return target.diff(now);
};

