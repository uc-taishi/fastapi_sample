# FastAPI練習

3層アーキテクチャのバックエンドであるFastAPIを実装してみよう
画面側のプログラムおよびDBは既に実装済みであるとして、
リクエストを受けてデータアクセスし、リクエストもとに結果を返す処理を作ってみよう

## 準備

以下の手順で環境構築を行う

### 1. Gitインストール

[こちらのリンク](https://www.sejuku.net/blog/73444)の手順でインストールを行うこと。gitコマンドが使える状態にしておく

### 2. Node.jsインストール

[こちらのリンク](https://zenn.dev/kuuki/articles/windows-nodejs-install)の手順でインストールを行うこと。npm installが使える状態にしておく

### 3. Pythonのインストール

[こちらのリンク](https://www.python.org/downloads/)からダウンロードしてインストールを行うこと。pip installが使える状態にしておく

### 4. ソースコードのクローン

```bash
git clone fastapi_sample
```

でソースコードをダウンロードする。あるいは、
https://github.com/uc-taishi/fastapi_sample
からZIPでダウンロードして解凍する

## 起動方法

### 1. フロントエンド（Next.js）

frontend/mock-application/README.mdに記載されている手順に従う。

### 2. バックエンド（FastAPI）

backend/sample_server/README.mdに記載されている手順に従う。

## 課題

backend/sample_server/README.mdに記載されている課題に取り組む
