# PR template 許願池

* 省時間
* 統一格式
* 提醒一些發 PR 前的檢查的事項
* 友善 Reviewer 閱讀


## 需求

### PR 方

* 提醒要到上線單填 pr 單號 (last)
* 提醒要加 tag (last)

> [補充]
> 因 slack 內容太長，下方內容會隱藏，`last` 為希望順序在最後面，因為相對於 Reviewer 較不重要。

### Reviewer 方

* 上線單號
* 需求單號
* pr 類型（bugfix、feature）
* 環境 (lab stg prod)
* 補充資訊（選填）- `可討論要什麼`
- Henry：目前有想到如果是上線單的話，可以填預計上線日期如 10/31 (一) 10:00 以及加註要確認的事項 如等後端先上，一般的 Feature 就簡介填寫一下改的功能跟範圍 (?)


## 討論範圍

### 標題
>許願： **單號** **內容簡述** **環境（待討論）**
> e.g. 
`ITPMCPLUSREQ-XXXX 面試評論 v1.0.0`、`feat(ITPMCPLUSREQ-XXXX) 面試評論 v1.0.0`
> e.g. 
`[Prod] ITPMCPLUSREQ-XXXX 面試評論`、`Prod/feat(ITPMCPLUSREQ-XXXX) -  面試評論`



<br/>

:::info
**[補充]**

模板是不包含標題的，要自己打，但因為也屬 PR 一部分，所以這次也會把標題格式定下來。


![](https://i.imgur.com/1EFwoWG.png)
:::
### 內容



:::info
**[補充]**
主要模板生成的區塊，每次開 PR 時，這邊會自動產一個 template，大家再根據欄位填寫。
![](https://i.imgur.com/2U8QKPy.png)
:::



## 目前初步版本

大家開 PR 時，就會跑出下面這個空白範本

![](https://i.imgur.com/lOTtqd7.png)


### 範例一 （Production PR）
![](https://i.imgur.com/Im8Qbv5.png)

### 範例二 （Lab PR）
![](https://i.imgur.com/zQ6waYO.png)




