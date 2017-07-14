export const CREATE_OR_UPDATE_SERVICE_REQUEST = 'gatekeeper/api/service/CREATE';
export const CREATE_OR_UPDATE_SERVICE_RESPONSE = 'gatekeeper/api/service/create/RESPONSE';
export const CREATE_OR_UPDATE_SERVICE_ERROR = 'gatekeeper/api/service/create/ERROR';

export const DELETE_SERVICE_REQUEST = 'gatekeeper/api/service/DELETE';
export const DELETE_SERVICE_RESPONSE = 'gatekeeper/api/service/delete/RESPONSE';
export const DELETE_SERVICE_ERROR = 'gatekeeper/api/service/delete/ERROR';

export default function backendRequests({ getState, dispatch }) {
    return next => action => {
        switch (action.type) {
            case CREATE_OR_UPDATE_SERVICE_REQUEST: {
                let { group, service, environments } = action;
                fetch('/api/gates', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({group, service, environments})
                }).then(function (response) {
                    if(response.status === 204) {
                        dispatch(createOrUpdateServiceResponse(group, service, environments));
                    } else if(response.status === 500) {
                        dispatch(handleCreateServiceError(response.json()));
                    }
                }).catch(function (error) {
                    dispatch(handleCreateServiceError(error));
                });
                break;
            }
            case DELETE_SERVICE_REQUEST: {
                let { group, service } = action;
                fetch(`/api/gates/${group}/${service}`, {
                    method: 'delete'
                }).then(function (response) {
                    if(response.status === 204) {
                        dispatch(deleteServiceResponse(group, service));
                    } else if(response.status === 404) {
                        dispatch(handleDeleteServiceError(`unknown service: ${group}/${service}`));
                    } else {
                        dispatch(handleDeleteServiceError(response.json()));
                    }
                }).catch(function (error) {
                    dispatch(handleDeleteServiceError(error));
                });
                break;
            }
            default:
                break;
        }
        return next(action);
    }
}

export function createOrUpdateServiceRequest(group, service, environments) {
    return { type: CREATE_OR_UPDATE_SERVICE_REQUEST, group, service, environments};
}

export function createOrUpdateServiceResponse(group, service, environments) {
    return { type: CREATE_OR_UPDATE_SERVICE_RESPONSE, group, service, environments};
}

export function deleteServiceRequest(group, service) {
    return {type: DELETE_SERVICE_REQUEST, group, service};
}

export function deleteServiceResponse(group, service) {
    return {type: DELETE_SERVICE_REQUEST, group, service};
}

export function handleCreateServiceError(error) {
    return {type: CREATE_OR_UPDATE_SERVICE_ERROR, error};
}

export function handleDeleteServiceError(error) {
    return {type: DELETE_SERVICE_ERROR, error};
}