# Vue.js 프로젝트 

## 프로젝트 내용
(이전) <a href="https://lab.ssafy.com/s10/a19/09_springboot/pair06_leedongjae_parkjongwoo">이동재, 박종우 스프링 프로젝트</a>의 HTML과 Vanilla Javascript로 구현한 프론트엔드에 Vue.js 프레임워크를 적용
1. 한 html 작성된 DOM을 기능/부분 별로 Vue Component 형태로 분할
2. document.getElementById로 적용한 Javascript를 Vue.js Composition내 script 태그 안으로 이동
2. fetch로 구현한 Ajax 대신 Axios 활용


## 구현 내용

### 1. Vue Compoenent로 변경
#### Member Controller
```java
//... 생략
@RestController
@RequestMapping("/member")
public class MemberController {
	private final UserService us;
	
	@Autowired
	public MemberController(UserService us) {
        super();
        this.us = us;
    }


	@PostMapping("/login")
	public CommonResponseDto login(@RequestBody UserDto userDto, HttpServletRequest request, HttpServletResponse  response) {
		CommonResponseDto res = new CommonResponseDto();
		String status = null;
		try {
			status = us.login(userDto);
		} catch (Exception e) {
			throw new LoginFailException();
		}
		System.out.println(status);
		if(status != null) {
			HttpSession session = request.getSession();

			session.setAttribute("id", userDto.getUserid());
			session.setAttribute("ip", request.getLocalAddr());

			Cookie cookie = new Cookie("id", userDto.getUserid()); // 쿠키로 id 정보 저장
			cookie.setPath("/");
			response.addCookie(cookie);
			System.out.println("로그인 성공");
			res.setMsg("로그인 성공");
		}else {
			res.setMsg("로그인 실패");
		}
		return res;
	}
    //... 생략
```
#### Member Mapper Interface
```java
//... 생략
@Repository
public interface MemberMapper {

	public String login(UserDto userDto) throws Exception;
	public String getUserPassword(String userid) throws Exception;
	public void checkUserid(String userid) throws Exception;
	public int signup(UserDto userDto) throws Exception;
}
```
#### MyBatis member.xml mapper
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.ssafy.web.member.dao.MemberMapper">


	<select id="login" resultType="String" parameterType="com.ssafy.web.member.dto.UserDto">
		select
		username from user where userid = #{userid} and
		userpassword =
		#{userpassword}
	</select>

    //... 생략

</mapper>
```
Mybatis로 두개의 데이터베이스를 연결하기 위해 Spring Boot 어플리케이션 시작 클래스 **com.ssafy.web.WebApplication**에서 configuration 수정
```java
// ... 생략
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@MapperScan(basePackages = "com.ssafy.web.*.dao", sqlSessionFactoryRef = "enjoyTripSqlSessionFactory")
@MapperScan(basePackages = "com.ssafy.web.member.securitydao", sqlSessionFactoryRef = "securitySqlSessionFactory")
public class WebApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebApplication.class, args);
	}

}
```

### 2. 친구 기능
친구 기능을 추가하여, 친구의 ID를 추가할 수 있고, 본인에게 친구 신청한 아이디를 수락할 수 있습니다.
친구가 되면 게시글 보기 기능에서 본인 글 외 추가적으로 친구의 글도 볼 수 있게 됩니다.

친구 데이터베이스는 다음과 같이 설계했습니다. friend1가 friend2를 친구로 추가하면 defaul로 status가 0이 되며 아직 미수락(pending) 상태입니다.
friend2가 친구 요청을 수락하면 status가 1로 변하며 양방향으로 친구 상태가 됩니다.

<img src="src/main/resources/Image/friend_table.png">

#### Friend Controller
```java
@RestController
@RequestMapping("/friend")
public class FriendController {
    private final FriendService fs;

    @Autowired
    public FriendController(FriendService fs) {
        this.fs = fs;
    }

    @PostMapping("/add")
    public CommonResponseDto add(@RequestBody FriendAddDto dto
    , HttpServletRequest request) throws Exception{
        int status = fs.add(dto);
        CommonResponseDto res = new CommonResponseDto();

        if(status == 1){
            res.setMsg("친구 등록 성공");
        }
        else{
            res.setMsg("친구 등록 실패");
        }
        return res;
    }

    @GetMapping("/friendRequestPending")
    public List<FriendRequestPendingDto> friendRequestPending(@RequestBody HashMap<String,String> id,
            HttpServletRequest request) throws Exception{
            System.out.println(id);
            List<FriendRequestPendingDto> data = fs.friendRequestPending(id.get("id"));
            if(data == null){
                throw new Exception("friend Error");
            }
            return data;
    }

    @PostMapping("/accept")
    public CommonResponseDto friendAccept(@RequestBody FriendAddDto dto, HttpServletRequest request) throws Exception
    {
        CommonResponseDto res = new CommonResponseDto();
        int status = fs.accept(dto);
        if(status == 1){
            res.setMsg("친구 수락 성공");
        }
        else{
            res.setMsg("친구 수락 실패");
        }
        return res;

    }
}
```

#### Friend Service
```java
@Service
public class FriendServiceImpl implements FriendService{
    // ...생략
    @Override
    public int add(FriendAddDto dto) throws Exception {
        return fm.add(dto);
    }

    @Override
    public List<FriendRequestPendingDto> friendRequestPending(String id) {
        return fm.friendRequestPending(id);
    }

    @Override
    public int accept(FriendAddDto dto) {
        return fm.accept(dto);
    }

    @Override
    public Set<String> findFriends(String id) {
        List<FriendAddDto> friends = fm.findFriends(id);
        Set<String> friendNames = new HashSet<>();
        for (FriendAddDto f: friends) {
            if (f.getFriend1().equals(id)) {
                friendNames.add(f.getFriend2());
            } else {
                friendNames.add(f.getFriend1());
            }
        }
        return friendNames;
    }
}
```

### 3. CustomException

#### CustomException.java
```java
@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException{

    private final ErrorCode errorCode = ErrorCode.findByClass(this.getClass());

    private HttpStatus httpStatus;
    private String msg;

    public CustomException() {
        this.httpStatus = errorCode.getHttpStatus();
        this.msg = errorCode.getMessage();
    }
}
```
Enum 클래스에서 정의된 클래스를 찾아 메세지와 httpStatus를 설정

#### ErrorCode.enum
```java
@Getter
public enum ErrorCode {
    //400
    COMMON_ERROR(BAD_REQUEST,"공통오류", MyException.class),
    LOGIN_ERROR(BAD_REQUEST,"로그인을 다시 시도해 주세요.", LoginFailException.class),
    REGISTER_ERROR(BAD_REQUEST, "회원가입을 다시 시도해 주세요.", RegistFailException.class),
    PLAN_REGIST_ERROR(BAD_REQUEST,"조회할 게시글을 다시 확인해주세요", PlanReigstException.class),
    NOT_LOGINED_ERROR(BAD_REQUEST,"로그인을 다시 해주세요", NotLoginedException.class),


    // 403
    PERMISSION_ERROR(FORBIDDEN,"접근이 안되는 기능입니다.", PermissionException.class),
    ;
    private final HttpStatus httpStatus;
    private final String message;
    private final Class<? extends Exception> klass;

    ErrorCode(HttpStatus httpStatus, String message, Class<? extends Exception> klass) {
        this.httpStatus = httpStatus;
        this.message = message;
        this.klass = klass;
    }
    public static ErrorCode findByClass(Class<? extends Exception> klass){
        return Arrays.stream(ErrorCode.values())
                .filter(code -> code.klass.equals(klass))
                .findAny().orElseThrow(NotFoundClassException::new);
    }
}
```
Enum 클래스로 Status ,Message, Class 정의

#### ErrorResponse.java
```java
@Getter
@Setter
@Builder
public class ErrorResponse {
    private final int status;
    private final String msg;

    public static ResponseEntity<ErrorResponse> toResponseEntity(ErrorCode errorcode){
        return ResponseEntity.status(errorcode.getHttpStatus())
                .body(ErrorResponse.builder()
                        .status(errorcode.getHttpStatus().value())
                        .msg(errorcode.getMessage()).build()
                );
    }
}
```
ResponseEntity<ErrorResponse> 를 만들어주는 toResponseEntity 메서드 생성

#### GlobalExceptionHandler
```java
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {


    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<ErrorResponse> handlerCustomException(CustomException e){
        return ErrorResponse.toResponseEntity(e.getErrorCode());
    }
}
```
RestControllerAdvice 를 통해 CustomException 발생시 ErrorResponse 반환

##### 동작화면
1. 이미 존재하는 회원이 있을 경우 PRIMARKY 오류 발생시 hrow new RegistFailException -> 회원가입을 다시 시도해 주세요. json 반환
<img src="src/main/resources/Image/회원가입오류.png">

### 4. 게시글 보기 권한체크
**Plan Controller**에서 session으로 요청한 아이디 확인하여 admin일 경우 전체 글 반환하고
일반 사용자의 경우 본인과 친구의 글 반환.

먼저 친구 데이터베이스에서 수락된 상태의 모든 친구를 list으로 가져와 본인의 아이디 또는 list내 친구의
아이디를 작성자로 갖고 있는 게시글만 반환.

```java
public class PlanController {
    // ...생략
    @GetMapping("/list")
    public ResponseEntity<?> list(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session == null){
            throw new NotLoginedException();
        }
        String id = (String) session.getAttribute("id");
        List<PlanDto> list = null;
        if (id == null) {
            Map<String, String> map = new HashMap<>();
            map.put("msg", "로그인이 필요한 기능입니다.");
            return ResponseEntity.ok(map);
        } else {
            list = ps.planList();
            if (!"admin".equals(session.getAttribute("id"))) {
                // session 있는 일반 사용자의 경우
                // get friends
                Set<String> friends = fs.findFriends(id);
                // 게시판 글 중 본인과 친구가 있는 부분 글만 반환
                List<PlanDto> validList = new ArrayList<>();
                for (PlanDto p: list) {
                    String planWriter = p.getUserid();
                    if (planWriter.equals(id) || friends.contains(planWriter)) {
                        validList.add(p);
                    }
                }
                return ResponseEntity.ok(validList);
            }
            return ResponseEntity.ok(list);
        }
    }
}
```

### 프로젝트 소감

<b>신우섭</b>

> 작성중...

<br>

<b>박종우</b>


> 작성중...

<br>
