export type TErrorResponse = {
    statusCode : number,
    status: 'error' | 'fail',
    message: string,
    issues:[
        {
            path: string,
            message:string
        }
    ]
}