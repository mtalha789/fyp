class ApiError extends Error{
    statusCode:number
    data:any
    errors:any
    success:boolean
    constructor(
        message='Something went wrong',
        statusCode=500,
        errors=[],
        stack=''
    ){
        super(message)
        this.message=message
        this.statusCode=statusCode
        this.data=null
        this.errors=errors
        this.success=false
        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}