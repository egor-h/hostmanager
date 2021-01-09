import api from "./base"

export type GetReqeust = {
    url: string,
    actionBeforeFetch: () => object,
    actionOnSuccess: (data: any) => object,
    actionOnError: () => object
}

export const get = <T>(request: GetReqeust) => {
    return (dispatch: any) => {
        dispatch(request.actionBeforeFetch());
        api.get<T>(request.url)
        .then(resp => {
            dispatch(request.actionOnSuccess(resp.data));
        })
        .catch(error => {
            dispatch(request.actionOnError());
            return Promise.reject(error);
        });
    }
}

export type PostRequest = {
    url: string;
    data: any;
    onSuccess: (dispatch: any) => void;
    onError: (dispatch: any) => void;
}

export const post = <T>(request: PostRequest) => {
    return (dispatch: any) => {
        api.post<T>(request.url, request.data)
        .then(resp => {
            request.onSuccess(dispatch);
        })
        .catch(error => {
            request.onError(dispatch);
            return Promise.reject(error);
        });
    }
}

export type PutRequest = {
    url: string;
    data: any;
    onSuccess: (dispatch: any) => void;
    onError: (dispatch: any) => void;
}

export const put = <T>(request: PutRequest) => {
    return (dispatch: any) => {
        api.put<T>(request.url, request.data)
        .then(resp => {
            request.onSuccess(dispatch);
        })
        .catch(error => {
            request.onError(dispatch);
            return Promise.reject(error);
        });
    }
}

export type DeleteRequest = {
    url: string;
    onSuccess: (dispatch: any) => void;
    onError: (dispatch: any) => void;
}

export const doDelete = (request: DeleteRequest) => {
    return (dispatch: any) => {
        api.delete(request.url)
        .then(resp => {
            request.onSuccess(dispatch);
        })
        .catch(error => {
            request.onError(dispatch);
            return Promise.reject(error);
        });
    }
}