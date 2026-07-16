# VINUS Content Migration Specification

## Overview

- Target: `src/app/page.tsx`
- Source: `https://vinus-website.vercel.app/`
- Interaction model: 기존 VINUSPREAD 메인의 스크롤·호버 모델 유지
- Direction: 원본 콘텐츠를 현재 Exo Ape 기반 편집형 레이아웃과 흑백 중심 룩앤필에 맞게 재구성

## Content Mapping

### Work

- Mongdang
- Shinhan Easy
- Crowdsourcing Platform Crowd OH!
- macadamia
- Budongsan114 Mediate BIZsolution
- DongA On book
- 원본 Supabase 대표 이미지를 `public/vinus/work/`에 로컬 저장

### Studio / How we work

- 원본의 20년 경력, AI 방법론, 기획부터 운영까지 함께한다는 소개를 현재 섹션의 짧은 영문 문장으로 편집
- 기존 서비스 4열 카드와 현재 타이포 체계 유지

### Clients

- 원본에 명시된 12개 클라이언트 사례와 수행 범위 사용
- 원본 로고 정적 경로가 404, 이미지 최적화 경로가 400을 반환하므로 깨진 로고 대신 타이포그래피 기반 정보 카드 사용
- 데스크톱 8열, 태블릿 4열, 모바일 2열 유지

### Ideas & Insights

- 실제 글 3건의 한국어 제목, 날짜, 편집 요약 사용
- 원본 썸네일을 `public/vinus/insights/`에 로컬 저장
- 기존 원형 썸네일과 리스트형 Exo Ape 레이아웃 유지

## Responsive Behavior

- Desktop: Work 비대칭 12열, Clients 8열, Insights 좌우 분할
- Tablet: Clients 4열, Work 비대칭 축소
- Mobile: Work 단일 열, Clients 2열, Insights 단일 열

## Known Source Limitations

- 원본 `/videos/hex-reel.mp4`는 직접 요청 시 404라 이식하지 않음
- 원본 `/images/logos/logo01.png`~`logo24.png`는 직접 요청 시 404이고 최적화 요청도 400이라 로컬 자산화하지 않음
