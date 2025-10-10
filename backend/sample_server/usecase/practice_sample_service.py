from repository.practice_sample_repository import PracticeSampleRepository

class PracticeSampleService:
    '''
    ユーザー一覧を取得するサービス
    '''

    def __init__(self, repository: PracticeSampleRepository):
        self.repository = repository

    async def fetch_users(self):
        '''
        ユーザー一覧を取得するメソッド
        '''
        return await self.repository.get_users()