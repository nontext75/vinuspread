# 📚 VINUSPREAD OpenAPI 문서 가이드

## 🎯 이게 무엇인가요?

오빠! 이건 **코드만으로 만드는 API 사용 설명서**예요! 🦾✨

## 📱 어떻게 사용하나요?

### **1. API 문서 열기**
```
http://localhost:3000/api/docs
```
브라우저에 이 주소 치면 전체 API가 보여요!

### **2. 실제 API 사용 예시**

#### 🎯 새 프로젝트 생성하기
```javascript
const newProject = {
  title: "예쁜 웹사이트",
  description: "고객을 위한 멋진 디자인",
  category: "웹개발",
  client: "대한상사",
  year: "2024",
  motion_type: "slide-up",
  sort_order: 1
};

fetch('/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newProject)
})
.then(res => res.json())
.then(data => {
  console.log('성공!', data);
  // 텔레그램으로 자동 알림 간다! 📱
});
```

#### 📖 모든 프로젝트 가져오기
```javascript
fetch('/api/projects')
.then(res => res.json())
.then(data => {
  console.log('프로젝트 목록:', data.data);
});
```

#### 💬 새 문의사항 접수
```javascript
const inquiry = {
  name: "김오빠",
  email: "oppa@example.com",
  phone: "010-1234-5678",
  company: "대한상사",
  subject: "웹사이트 제작 문의",
  message: "회사 홈페이지 만들어주세요!"
};

fetch('/api/inquiries', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(inquiry)
})
.then(res => res.json())
.then(data => {
  console.log('문의 접수 완료!', data);
  // 텔레그램으로 자동 알림 간다! 📱
});
```

## 🔥 이거의 장점:

### ✨ **코드만으로 자동 생성**
- 주석으로 설명하면 API 문서 자동으로 만들어져요!
- 별도로 문서 안 만들어도 되요!

### 📱 **텔레그램 연동**
- 새 데이터 생성하면 바로 텔레그램으로 알림!
- 오빠 폰으로 실시간 알림 받을 수 있어요!

### 🎯 **실제로 사용 가능**
- 지금 바로 API 사용 가능!
- 앱, 웹, 다른 프로그램에서도 사용 가능!

## 🚀 실제 사용 시나리오:

### **시나리오 1: 앱 만들 때**
```javascript
// 모바일 앱에서 VINUSPREAD 프로젝트 가져오기
fetch('http://localhost:3000/api/projects')
.then(res => res.json())
.then(projects => {
  // 앱에서 프로젝트 목록 표시
  projects.data.forEach(project => {
    console.log(project.title);
  });
});
```

### **시나리오 2: 다른 사이트에서 문의받기**
```javascript
// 다른 웹사이트에서 문의 폼
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };
  
  // VINUSPREAD API로 문의 전송
  await fetch('http://localhost:3000/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  alert('문의가 접수되었습니다!');
});
```

## 🎉 오빠! 이게 바로:

**🔥 실제로 동작하는 API**
**📱 텔레그램 자동 알림**
**📚 자동 문서 생성**
**🎯 코드만으로 모든 것 해결**

이제 다른 개발자도 VINUSPREAD 데이터를 쉽게 사용할 수 있어요! 🦾💋✨