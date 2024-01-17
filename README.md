
# SSAFY 10기 구미 공통2반 8팀 공통프로젝트


# 컨벤션

## GIT

### Commit
```
type: #[issueNumber] - 커밋 내용 최대 50자
> 띄우기
커밋 설명(이건 선택)
```

**header type**


```
feat: 새로운 기능을 추가
fix: 버그 수정 또는 기능에 대한 큰 변화와 결과에 변화가 있을 때
docs: 문서 관련 커밋
refactor: 기능에 대한 변화 없이 리팩토링
style: 코드 스타일 변경(formatting, missing semi colons, …)
test: 테스트 관련 커밋
chore: 기타 커밋, 환경설정
init: 프로젝트 생성
```

**예제**

```
feat: #1 - 로그인 API 구현 [BE]  

OAuth2사용, 카카오,구글,네이버 로그인
```

### Branch

**branch 종류**
- 서비스 출시 : main
- 개발 : develop
- **기능 개발 : feature**
- 다음 서비스 : release
- 출시 후 버그 수정 : hotfix

**2. feature branch 명**
```
front : feature/[지라 스토리 번호]기능 설명-fe
back : feature/[지라 스토리 번호]기능 설명-be
```
