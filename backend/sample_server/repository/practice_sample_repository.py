from abc import ABCMeta, abstractmethod
from typing import List
from domain.practice_sample import User


class PracticeSampleRepository(metaclass=ABCMeta):
    '''
    ユーザー一覧を取得するリポジトリのインターフェース
    具体的な実装はinfra層で行う
    例えば、DBから取得する場合は、DBアクセスの実装をinfra層で行う
    例えば、外部APIから取得する場合は、外部APIアクセスの実装をinfra層で行う
    例えば、ファイルから取得する場合は、ファイルアクセスの実装をinfra層で行う
    などの柔軟性がある
    '''

    @abstractmethod
    async def get_users(self) -> List[User]:
        '''
        ユーザー一覧を取得するメソッド
        Returns:
            List[User]: ユーザー一覧
        '''
        pass
