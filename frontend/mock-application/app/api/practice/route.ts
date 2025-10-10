import { NextResponse } from 'next/server';
import { USE_DUMMY_DATA, FASTAPI_URL } from '../../config';

/**
 * GETリクエストのハンドラ
 */
export async function GET() {
  // ダミーデータを使用する場合の処理
  if (USE_DUMMY_DATA) {
    const dummyData = [
        {userId: 'sample_user_1', userName: 'サンプルユーザー１'},
        {userId: 'sample_user_2', userName: 'サンプルユーザー２'},
        {userId: 'sample_user_3', userName: 'サンプルユーザー３'},
    ];

    // 1秒待ってからレスポンスを返す（ローディングのシミュレーション）
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(dummyData);
  }

  // --- FastAPIへ接続する本番用の処理 ---
  try {
    const response = await fetch(`${FASTAPI_URL}/api/practice/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`FastAPI request failed with status ${response.status}`);
    }

    console.log(response);

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('[API_PRACTICE_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}