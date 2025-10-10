from databases import Database
from repository.practice_sample_repository import PracticeSampleRepository
from infra.practice_sample_impl import PracticeSampleImpl
from injector import Module, provider, singleton, Binder


@singleton
class PracticeSampleModule(Module):
    '''
    PracticeSampleのDIコンテナの設定を行うモジュール
    '''
    
    def __init__(self, db: Database):
        self.__db = db
        
    def configure(self, binder: Binder):
        '''
        DIコンテナの設定を行う
        具体的には、PracticeSampleRepositoryインターフェースに対して
        PracticeSampleImplクラスをバインドする
        これにより、DIコンテナからPracticeSampleRepositoryを取得すると
        PracticeSampleImplのインスタンスが返されるようになる
        '''
        binder.bind(PracticeSampleRepository, PracticeSampleImpl)

    @provider
    def getDatabase(self) -> Database:
        '''
        Databaseインスタンスを提供するプロバイダメソッド
        プロバイダメソッドとは、DIコンテナに特定のインスタンスを提供するためのメソッドです。
        ここでは、Databaseインスタンスを提供しています。
        '''
        return self.__db