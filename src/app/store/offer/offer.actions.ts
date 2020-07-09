import { createAction, props } from '@ngrx/store';
import { Request } from 'src/app/models/request.model';


export const offerInProgressAction = createAction(
  '[Offer] Activate/disactivate load bar'
);

export const requestListIsChangingAction = createAction(
  '[Offer] Activate status changing request list'
);
export const requestListNotChangingAction = createAction(
  '[Offer] Disactivate status changing request list'
);

export const loadActualRequestListFromDBAction = createAction(
  '[Offer] Load buyer requests from data base for seller',
  props<{ requests: Request[] }>()
);

export const setNewRequestCounterAction = createAction(
  '[Offer] Set count of new actual requests for seller',
  props<{ count: number }>()
);

export const setRequestToAnswerAction = createAction(
  '[Offer] Set request to give offer',
  props<{ request: Request }>()
);

export const closeRequestToAnswerAction = createAction(
  '[Offer] clear request after offer',
);
export const setFiltredRequestListAction = createAction(
  '[Offer] Set filtered request list',
  props<{ filteredList: Request[] }>()
);
export const setOfferFilterNameAction = createAction(
  '[Offer] Set filter name in Offer',
  props<{ offerFilterName: string }>()
);
export const setPaginatedRequestListAction = createAction(
  '[Offer] Set Paginated requestlist',
  props<{ paginatedList: Request[] }>()
);
export const setPaginatorEventAction = createAction(
  '[Offer] Set Paginator event',
  props<{ paginatorEvent: object, filterName: string }>()
);
