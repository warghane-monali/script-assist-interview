export type User = {
    firstName: string
    lastName: string
    mobileNo: string
    emailId: string
    age: number,
    _id:any
  }
  
  export type ApiResponse = {
    data: User[]
    count: number,
    noOfPages:number
  }