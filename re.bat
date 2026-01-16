@echo off
echo.
echo [1/4] React Build Start...
cd frontend
call npm run build
cd ..

echo.
echo [2/4] Copying React Build to Spring Boot...
:: 기존 static 폴더 내용 삭제 (images 폴더 제외하고 싶으면 옵션 조정 필요하지만, 간단히 덮어쓰기로 진행)
xcopy /s /y "frontend\dist\*.*" "src\main\resources\static\"

echo.
echo [3/4] Spring Boot Build (Maven)...
call .\mvnw.cmd clean package -DskipTests

echo.
echo [4/4] Server Start!
java -jar target/demo-0.0.1-SNAPSHOT.war