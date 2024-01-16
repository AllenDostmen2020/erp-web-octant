export const objectToURLSearchParams = (queryParams: { [key: string]: any }, ignoreKeys: string[] = []): URLSearchParams => {
    const query_params = JSON.parse(JSON.stringify(queryParams));
    var searchParams = new URLSearchParams();
    for (const key in query_params) {
        if (query_params[key] === '' || query_params[key] === null || query_params[key] === undefined  || query_params[key] === false || ignoreKeys.includes(query_params[key]))
            continue;
        searchParams.append(key, query_params[key]);
    }
    return searchParams;
};