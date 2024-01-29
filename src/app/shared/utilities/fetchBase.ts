import { FetchErrorResponse, FetchErrorType, RequestInitFetch } from "src/app/shared/interfaces/fetch";

declare type ProcessBeforeCallRequest = (apiUrl: string, request: RequestInitFetch) => Promise<void> | void;

declare type ProcessAfterCallRequest<T> = (response: Response, request: RequestInitFetch) => Promise<void> | void;

declare type IntercepErrors = (error: FetchErrorResponse, request: RequestInitFetch) => Promise<void> | void;

declare type IntercepHeaders = (request: RequestInitFetch) => Promise<{ [Key: string]: string }> | { [Key: string]: string };

export class FetchBase {
    constructor(
        private configurations: {
            beforeCallRequestFn?: ProcessBeforeCallRequest,
            afterCallRequestFn?: ProcessAfterCallRequest<any>,
            interceptErrorsFn?: IntercepErrors,
            interceptHeadersFn?: IntercepHeaders,
        } = {}
    ) { }

    private setDefaultHeaders(headers: any = {}): any {
        if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';
        if (!headers['Accept']) headers['Accept'] = 'application/json';
        return { ...headers };
    }

    private async executeRequest<T>(apiUrl: string, request?: RequestInitFetch, blob: boolean = false): Promise<T> {
        try {
            const { interceptHeadersFn } = this.configurations;
            const headers = interceptHeadersFn ? await interceptHeadersFn(request as any) : request?.headers; // intercept headers

            const { beforeCallRequestFn } = this.configurations;
            if (beforeCallRequestFn) await beforeCallRequestFn(apiUrl, request!); // intercept before call request

            const response = await fetch(apiUrl, { ...request, headers: this.setDefaultHeaders(headers) });

            if(response.ok) {
                const data = blob ? await response.blob() as any : await response.json();
                
                const { afterCallRequestFn } = this.configurations;
                if (afterCallRequestFn) await afterCallRequestFn(response, request!); // intercept after call request

                return data;
            }


            const messageError = await response.json();
            const fetchError: FetchErrorResponse = {
                status: response.status,
                url: response.url,
                headers: response.headers,
                statusText: response.statusText,
                ok: response.ok,
                error: messageError,
                message: `Http failure response for ${apiUrl}: ${response.status} ${response.statusText}`,
                name: FetchErrorType.HTTP,
                method: request?.method as any || 'GET',
            }
            
            throw fetchError;
        } catch (error:any) {
            const errorName = error.name as FetchErrorType;
            if(errorName === FetchErrorType.HTTP) throw error;
            const fetchError: FetchErrorResponse = {
                status: 0,
                url: apiUrl,
                ok: false,
                error: errorName,
                message: error.message ?? `Http failure response for ${apiUrl}: ${errorName}`,
                name: errorName,
                method: request?.method as any || 'GET',
            }
            throw fetchError;
        }
    }

    private async call<T>(apiUrl: string, request?: RequestInitFetch, blob?: boolean): Promise<T> {
        try {
            return await this.executeRequest<T>(apiUrl, request, blob);
        } catch (error) {
            const { interceptErrorsFn } = this.configurations;
            if (interceptErrorsFn) await interceptErrorsFn(error as FetchErrorResponse, request ?? {});
            throw error;
        }
    }

    protected _get<T = any>(apiUrl: string, requestInit?: RequestInitFetch): Promise<T> {
        return this.call<T>(apiUrl, { ...requestInit, method: 'GET' });
    }

    protected _post<T = any>(apiUrl: string, body: any, requestInit?: RequestInitFetch): Promise<T> {
        return this.call<T>(apiUrl, { ...requestInit,body: JSON.stringify(body), method: 'POST' });
    }

    protected _put<T = any>(apiUrl: string, body: any, requestInit?: RequestInitFetch): Promise<T> {
        return this.call<T>(apiUrl, { ...requestInit,body: JSON.stringify(body), method: 'PUT' });
    }

    protected _delete<T = any>(apiUrl: string, requestInit?: RequestInitFetch): Promise<T> {
        return this.call<T>(apiUrl, { ...requestInit, method: 'DELETE' });
    }

    protected _patch<T = any>(apiUrl: string, body: any, requestInit?: RequestInitFetch): Promise<T> {
        return this.call<T>(apiUrl, { ...requestInit,body: JSON.stringify(body), method: 'PATCH' });
    }

    protected _blob<T = any>(apiUrl: string, requestInit?: RequestInitFetch): Promise<T> {
        return this.call<T>(apiUrl, { ...requestInit, method: 'GET' }, true);
    }


}