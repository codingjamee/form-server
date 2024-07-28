# form-server

### routes 목록

- admin form

  - 폼 생성:
    post, "/admin/forms"
  - 응답 가져오기:
    get, "/admin/responses/?formId='' "

- user form

  - 폼 가져오기:
    get "/user/forms/?formId=''"

  - 응답 제출
    post "/user/responses/:formId"
  -
