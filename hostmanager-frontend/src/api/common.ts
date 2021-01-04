export const BASE_URL = "http://localhost:8080"

export type GetReqeust = {
    url: string,
    actionBeforeFetch: () => object,
    actionOnSuccess: (data: any) => object,
    actionOnError: () => object
}

export type GetRequestReturn = (dispatch: any) => void

export const getRequest = (request: GetReqeust): GetRequestReturn => {
    return (dispatch: any) => {
        console.log(`GET to ${request.url}`);
        dispatch(request.actionBeforeFetch());
        fetch(request.url)
            .then(res => res.json())
            .then(
                data => dispatch(request.actionOnSuccess(data)),
                err => {
                    console.error(err);
                    dispatch(request.actionOnError());
                }
            );
    }
}