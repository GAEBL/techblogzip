# How to Use Backend

## Install

- Django Backend API 서버 실행을 위해 필수 라이브러리 설치가 필요합니다.
- 라이브러리는 `requirements.txt`에 등록되어 있으며 위치는 `s02p31c103\backend`입니다.

> 대다수의 라이브러리는 requirements.txt에 있지만 만일 적혀있지 않은 경우 backend 담당자를 불러주세요.

```bash
$ pip install -r requirements.txt
```

## Error Exception

- `python manage.py makemigrations` 혹은 `migrate`를 할 때 `django.db.utils.OperationalError: no such table: mainapp_company` 에러가 발생하는 경우

  - 해당 에러는 DB가 비어있는 경우 `crawler`의 각 crawling 설정이 빈 DB를 불러오기 때문에 발생하는 문제입니다.
  - 해결을 위해서는 mattermost에 올라온 임시 DB를 사용해주세요.

  > 추후 수정 예정입니다.

