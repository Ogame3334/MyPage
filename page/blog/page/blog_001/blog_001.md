# C++のDrogonを使ってみた
<div class="date">2023/07/04</div>

## Drogonとは
　DrogonはC++14/17ベースのHTTPアプリケーションフレームワークです。<br>C++で書かれているので、高速で処理を行えることが強みとなっています。

## 開発環境
- Ubuntu 22.04.2 LTS
- drogon 1.8.4

## 環境構築
### 必要ライブラリのインストール
Drogonフレームワークを使うには、前提となるライブラリをインストールしておく必要があります。
以下のコマンドを入力して必要なライブラリをインストールします。
```
$ sudo apt update
$ sudo apt upgrade
$ sudo apt install git \
cmake \
gcc \
curl \
libjsoncpp-dev \
uuid-dev \
libssl-dev \
zlib1g-dev \
libc-ares-dev \
build-essential 
```
gitを使ったことがない人はアカウントの作成やSSH鍵などの設定が必要になります。
### Drogonのインストール
必要なライブラリをインストールしたら、いよいよDrogonのインストールです。

Drogonフレームワークはパッケージでのインストールではなく、ソースコードをダウンロードしてのビルドが必要です。

私は`CppLib`というディレクトリを作成し、その中にダウンロードしました。
```shell
$ mkdir CppLib
$ cd CppLib
$ git clone https://github.com/an-tao/drogon
$ cd drogon
$ git submodule update --init
$ mkdir build
$ cd build
$ cmake ..
$ make && sudo make install
```
上のコマンドを実行すればインストールが完了します。

`drogon_ctl -v`を実行してみましょう。以下のように表示されたら正常にインストールが出来ています。
```
     _
  __| |_ __ ___   __ _  ___  _ __
 / _` | '__/ _ \ / _` |/ _ \| '_ \
| (_| | | | (_) | (_| | (_) | | | |
 \__,_|_|  \___/ \__, |\___/|_| |_|
                 |___/

A utility for drogon
Version: 1.8.4
Git commit: 3c82dcb491a1433be84dc96d9d0a5406371a579d
Compilation:
  Compiler: c++
  Compiler ID: GNU
  Compilation flags: -std=c++17 -I/usr/include/jsoncpp -I/usr/local/include
Libraries:
  postgresql: yes  (pipeline mode: yes)
  mariadb: no
  sqlite3: no
  ssl/tls backend: OpenSSL
  brotli: no
  boost: no
  hiredis: no
  c-ares: yes
  yaml-cpp: no
```
これにて環境構築は完了です！

## サーバーの立ち上げ
### プロジェクトの作成
まずは、