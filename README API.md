# API

http://k02c1031.p.ssafy.io:8000

<br>



## AUTH

| 기능                    | API          | METHOD         |
| ----------------------- | ------------ | -------------- |
| 로그인                  | /auth/login  | POST           |
| 회원가입                | /auth/signup | POST           |
| 토큰 CHECK              | /auth/check  | GET            |
| 회원정보 보기/수정/삭제 | /auth/myinfo | GET/PUT/DELETE |

<br>



## Page

| 기능                                  | API    | METHOD |
| ------------------------------------- | ------ | ------ |
| 메인 페이지(기업, 포스트 개수)        | /home  | GET    |
| 블로그 글 리스트(분류 - 좋아요, 최신) | /posts | GET    |



<br>



## Trend

| 기능                                                      | API                | METHOD |
| --------------------------------------------------------- | ------------------ | ------ |
| language, frontend, backend, lib 상위 N개의 태그 언급횟수 | /trend             | GET    |
| 태그 언급 날짜와 횟수                                     | /trend/tag         | GET    |
| 회사별 일별 포스트 횟수                                   | /trend/posts/date  | GET    |
| 기업별 상위 N개 태그 횟수                                 | /trend/company/tag | GET    |

<br>



## Serach

| 기능                                         | API           | METHOD |
| -------------------------------------------- | ------------- | ------ |
| tag 검색                                     | /search/tag   | GET    |
| POSTS의 title, tag, company, contents를 검색 | /search/posts | GET    |

<br>



## Like

| 기능                             | API                   | METHOD |
| -------------------------------- | --------------------- | ------ |
| POSTS에 좋아요 클릭              | /like/posts/<post_id> | POST   |
| 사용자가 좋아요 누른 포스트 목록 | /like/user/posts      | GET    |

<br>



## ETC

| 기능    | API      |
| ------- | -------- |
| Swagger | /swagger |
| Redoc   | /redoc   |

