export interface BadRequestInterface {
    data: any
    isvalid: boolean
    messages: message[]
}

export interface message {
    statusCode: number
    status: 'error' | 'success' | 'warning'
    message: string
    parameter: string
}
