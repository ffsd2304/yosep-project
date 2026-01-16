# 1. 자바 실행 환경 (Amazon Corretto 17 사용 - 가장 안정적)
FROM amazoncorretto:17

# 2. Maven 빌드 결과물인 target 폴더의 war 파일을 복사
COPY target/*.war app.war

# 3. WAR 파일 실행 명령어
ENTRYPOINT ["java", "-jar", "/app.war"]