from fastapi import APIRouter, Request
from injector import Injector
from typing import List

import config
from domain.practice_sample import OutputSample, User
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

@router.get('/api/practice/users/{user_id}', response_model=OutputSample)
async def get_users_by_user_id(user_id: str):
    
    output = OutputSample()
    output.response_status = "200"
    output.response_message = "Success"
    user = User()
    user.user_id = user_id
    user.user_name = "test"
    output.users = [user]

    return output

@router.get('/api/practice/users/search', response_model=OutputSample)
async def search_users(userId: str = None, userName: str = None):
    output = OutputSample()
    output.response_status = "200"
    output.response_message = "Success"
    user = User()
    user.user_id = userId
    user.user_name = userName
    output.users = [user]

    return output

@router.post('/api/practice/users/register', response_model=OutputSample)
async def register_user(user: User):
    print(user)
    output = OutputSample()
    output.response_status = "200"
    output.response_message = "Success"
    output.users = [user]
    return output

@router.put('/api/practice/users/update', response_model=OutputSample)
async def update_user(user: User):
    print(user)
    output = OutputSample()
    output.response_status = "200"
    output.response_message = "Success"
    return output

@router.delete('/api/practice/users/delete', response_model=OutputSample)
async def delete_user(user_id: str = None):
    print(user_id)
    output = OutputSample()
    output.response_status = "200"
    output.response_message = "Success"
    return output