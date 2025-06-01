import { NextResponse } from "next/server";

export default class ResponseHandler {
  static success<T = any>(
    statusCode: number = 200,
    message: string = "Success",
    data: T = {} as T,
    success: boolean = true
  ) {
    return NextResponse.json(
      {
        statusCode,
        message,
        data,
        success,
      },
      { status: statusCode }
    );
  }

  static error<T = any>(
    statusCode: number = 500,
    message: string = "Something went wrong",
    data: T = {} as T,
    success: boolean = false
  ) {
    return NextResponse.json(
      {
        statusCode,
        message,
        data,
        success,
      },
      { status: statusCode }
    );
  }
}