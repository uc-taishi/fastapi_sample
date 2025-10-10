from fastapi import APIRouter
from injector import Injector

import config
from domain.practice_sample import OutputSample
from injectormodules.di import PracticeSampleModule
from repository.practice_sample_repository import PracticeSampleRepository
from usecase.practice_sample_service import PracticeSampleService

router = APIRouter()

@router.get('/api/practice/users', response_model=OutputSample)
async def get_users():
    '''
    ユーザー一覧を取得するAPI
    URL: /api/practice/users
    Method: GET
    Parameters:
        なし
    Returns:
        OutputSample: ユーザー一覧を含むレスポンスオブジェクト
    Raises:
        なし
    Description:
        ユーザー一覧を取得するAPI
    '''

    print('start get_users')
    # DIコンテナからインスタンスを取得
    injector = Injector([PracticeSampleModule(config.database)])
    # リポジトリとサービスのインスタンスを取得
    repository = injector.get(PracticeSampleRepository)
    # サービスオブジェクトをインスタンス化
    service = PracticeSampleService(repository)

    # 出力用オブジェクトを初期化
    output = OutputSample()
    
    # ユーザー一覧を取得
    try:
        users = await service.fetch_users()
        # 取得に成功していたら以下の値をセット
        output.response_status = "200"
        output.response_message = "Success"
        output.users = users
    except Exception as e:
        # 取得に失敗していたら以下の値をセット
        output.response_status = "500"
        output.response_message = str(e)

    print('end get_users')
        
    return output
