// 요셉님이 만든 상세페이지 컴포넌트를 불러옵니다.
import Login from './components/login/Login';

function App() {
  return (
    <div className="App">
      {/* 여기에 네비게이션 바나 헤더를 넣을 수 있습니다. */}
      
      <main>
        <Login />
      </main>

      {/* 여기에 푸터를 넣을 수 있습니다. */}
    </div>
  );
}

export default App;