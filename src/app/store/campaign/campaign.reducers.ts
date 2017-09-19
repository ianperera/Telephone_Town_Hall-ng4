import { concat, last, maxBy, assign } from 'lodash';
import { Maybe } from 'monet';

import { CampaignStatsEvent, ScheduleStatBrief } from '../../models/events';

import * as campaign from './campaign.actions';

export interface State {
  stats: CampaignStatsEvent[];
}

const initialState: State = {
  stats: [],
};

export function reducer(state = initialState, action: campaign.Actions): State {
  switch (action.type) {
    case campaign.CAMPAIGN_STATS_UPDATE:
      return {...state, stats: concat(state.stats, assign({}, action.payload))};

    default:
      return state;
  }
}

export const getStats = (state: State) => state.stats;
export const getLatestStats = (state: State) => state.stats.splice(-1)[0];
export const getMinutesLeft = (state: State) => 
  Maybe.fromNull(last(state.stats))
    .flatMap((s: CampaignStatsEvent) => Maybe.fromNull(maxBy(s.hostCampaignSchedules, 'minutesLeft')))
    .map((s: ScheduleStatBrief) => s.minutesLeft)
    .orSome(0)
