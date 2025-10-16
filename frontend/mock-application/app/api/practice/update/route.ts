import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { FASTAPI_URL } from '../../../config';

export async function PUT(request: NextRequest) {
  try {
    const requestBody = await request.json();
    console.log("Request Body:", requestBody); // リクエストボディの内容をログに出力
    const response = await fetch(`${FASTAPI_URL}/api/practice/users/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    console.log("Response Status:", response.status); // レスポンスステータスをログに出力
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

}