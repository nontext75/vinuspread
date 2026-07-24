# Figma 반응형 변수(Variable) 체계 정리

이 문서는 `new-vinuspread` Figma 파일(fileKey: `uv50twt2M0QFSTIr0hLxQk`)에서 PC 기준 디자인을 Tablet/Mobile로 파생시킬 때 사용하는 변수(Variable) 체계와, 이번 작업에서 발견·수정한 문제, 앞으로 같은 작업을 반복할 때 지켜야 할 규칙을 정리한다.

> 최종 갱신: 2026-07-23

## 1. 배경과 원칙

- **PC가 유일한 소스 오브 트루스**다. Tablet/Mobile은 PC 디자인에서 파생되며, 별도로 새 레이아웃을 발명하지 않는다.
- 값(폰트 크기, 간격, 아이콘 크기 등)이 디바이스별로 달라야 한다면 **Variable Mode(PC/Tablet/Mobile)** 로 관리한다. Variant(컴포넌트 복제)는 **레이아웃 구조 자체**가 달라질 때만 사용한다.
- 원시(raw) 스케일 변수를 컴포넌트에 직접 물리지 말고, 용도별 **시멘틱 변수**를 하나 더 두고 그것이 원시 스케일 값을 가리키게 한다. 이렇게 해야 나중에 스케일 값을 바꿔도 의도치 않게 다른 컴포넌트가 같이 틀어지지 않는다.

## 2. 변수 컬렉션 인벤토리

| 컬렉션 | 모드 | 용도 | 비고 |
| --- | --- | --- | --- |
| `VINUS / Type Scale` | PC / Tablet / Mobile | 텍스트 스타일의 font-size (heading-56, body-16, label-14 등) | 텍스트 스타일이 이 컬렉션의 변수를 `boundVariables.fontSize`로 참조 |
| `VINUS / Space Scale` | PC / Tablet / Mobile | 섹션 여백, 카드 간격 등 반응형 spacing | 이번 세션에 신설 |
| `VINUS / Icon Scale` | PC / Tablet / Mobile | 아이콘 프레임 width/height | 이번 세션에 신설, 사용 조건 있음(§5 참조) |
| `VINUS / Breakpoint` | PC / Tablet / Mobile | 컴포넌트/페이지가 "지금 어떤 디바이스인지" 표시하는 용도 | 값 자체보다는 모드 선택 신호로 쓰임 |
| `VINUS / Number` | Mode 1 (단일 모드) | 디바이스 무관 고정 상수 (space/64, space/160 등) | 모드가 하나뿐이라 반응형 파생에는 못 씀 — 반응형이 필요하면 Space Scale 등으로 옮길 것 |

### Type Scale 참고 표 (PC / Tablet / Mobile)

| 스타일 | PC | Tablet | Mobile |
| --- | --- | --- | --- |
| display-hero | 360 | 160 | 60 |
| display-200 | 200 | 128 | 64 |
| display-160 | 160 | 96 | 56 |
| display-120 | 120 | 72 | 44 |
| heading-96 | 96 | 64 | 36 |
| heading-72 *(신설)* | 72 | 40 | 24 |
| heading-56 | 56 | 40 | 28 |
| heading-48 | 48 | 36 | 28 |
| heading-40 | 40 | 32 | 24 |
| heading-36 | 36 | 28 | 24 |
| title-24 | 24 | 20 | 20 |
| title-20 | 20 | 20 | 16 |
| body-24 | 24 | 20 | 16 |
| body-20 | 20 | 16 | 16 |
| body-16 | 16 | 16 | 14 |
| body-14 | 14 | 14 | 14 |
| label-16 | 16 | 14 | 12 |
| label-14 | 14 | 12 | 12 |
| label-12 | 12 | 12 | 12 |
| label-nav | 16 | 14 | 12 |

`display-hero-mobile`(60/60/60 고정값)은 `display-hero`가 이미 3개 모드를 다 갖고 있어 중복이라 삭제함 — 새 스타일이 필요할 때 이런 중복 여부를 먼저 확인할 것.

### Space Scale에 이번에 추가한 변수

| 변수 | PC | Tablet | Mobile | 용도 |
| --- | --- | --- | --- | --- |
| `space/footer-next-page-gap` | 24 | 18 | 14 | Footer "Next page" 텍스트↔화살표 간격 |
| `space/footer-section-gap` | 24 | 18 | 14 | Footer 두 콘텐츠 영역 사이 세로 간격 |
| `space/section-margin-y` | 160 | 64 | 48 | 섹션 위/아래 여백 (Portfolio List 등) |
| `space/card-gap-row` | 24 | 24 | 48 | 카드 그리드 행간 간격 |
| `space/section-internal-gap` | 0 | 32 | 24 | 섹션 내부(타이틀↔콘텐츠) 간격, Portfolio List·Studio Services 공용 |
| `space/form-field-gap` | 56 | 32 | 20 | Contact 폼 필드 간격 |
| `space/cta-row-gap` | 16 | 16 | 12 | Contact CTA 버튼 행 간격 |

### Icon Scale

| 변수 | PC | Tablet | Mobile | 용도 |
| --- | --- | --- | --- | --- |
| `icon/footer-next-arrow` | 64 | 40 | 24 | Footer "Next page" 화살표 아이콘 |

## 3. 값 파생 비율 (참고용)

이번 세션에서 사용자가 제시한 기준: **PC 64 → Tablet 48 → Mobile 36 (0.75배씩 단계적 축소)**. 이 비율을 다른 spacing 값에도 적용해서 Tablet = PC×0.75, Mobile = Tablet×0.75로 계산했다. 다만 이미 존재하는 가로 마진(`space/64`, `space/40`, `space/20` 등)처럼 디자이너가 이미 다른 비율을 확정해둔 곳은 그 값을 그대로 존중하고 임의로 재계산하지 않았다.

## 4. Variant → Variable Mode 통합 작업 (완료)

값만 다르고 레이아웃 구조는 동일했던 컴포넌트를 Device variant 3~9개에서 **디바이스 무관 단일 컴포넌트**로 합쳤다. Variable Mode가 배치된 위치(부모 인스턴스/페이지 프레임)에서 자동으로 캐스케이드되어 알맞은 크기를 낸다.

| 컴포넌트 | 이전 | 이후 | 비고 |
| --- | --- | --- | --- |
| Tag | Device×State = 6 | State만 2 (`State=Default`/`State=Active`) | 실사용 인스턴스 18개 스왑 완료 |
| History Card | Device 3 | 1 | 인스턴스 없어서 안전하게 삭제만 |
| SubpageHero | Device 3 | 1 (`SubpageHero`) | 실사용 인스턴스 8개 스왑 |
| FormField | Device 3 | 1 (`FormField`) | 실사용 인스턴스 18개 — Desktop 컴포넌트의 강제 PC 오버라이드가 실제 Contact 페이지 Tablet/Mobile에서도 라이브 버그를 내고 있었음(§6 참고) |
| StoryDetailHeader | Device 3 | 1 (`StoryDetailHeader`) | 실사용 인스턴스 2개 |
| ServiceBlock | Device×Type = 9 | Device만 3 | "Type"(Interface/Visual/Brand)은 실제로는 콘텐츠 차이였고, Visual만 이미지 좌우 반전이라는 진짜 구조 차이가 있었음 → 그 인스턴스만 detach해서 반전 유지, 나머지는 콘텐츠(제목/본문/태그/이미지)를 캡처해뒀다가 스왑 후 재적용 |

## 5. 레이아웃 구조가 달라 Variant를 유지한 컴포넌트

Footer, Header, Hero, ProjectMetaGrid, StoryListItem, ProjectDetailNavigation, Project Hero — 디바이스별로 컬럼 수·요소 표시 여부·순서가 달라서 Variable Mode만으로 대체할 수 없다. 이 컴포넌트들은 각 variant의 Type Scale 모드 바인딩 누락/오배정 버그만 고쳤다.

## 6. 발견한 버그 패턴과 교훈 (중요 — 다음에 또 반복될 수 있음)

1. **모드 미연결 → 조용히 PC 값으로 폴백**: Tablet/Mobile variant에 Type Scale 모드를 명시적으로 안 걸어두면 에러 없이 그냥 PC(기본 모드) 값을 그대로 보여준다. Figma UI에도 경고가 안 뜬다. → 새 variant를 만들 때마다 `explicitVariableModes`에 해당 컬렉션 바인딩이 있는지 확인 습관화.
2. **"Forced mode가 상위를 가린다"**: 반대로 어떤 variant(특히 원래 Desktop이었던 것)에 스타일 모드가 **명시적으로 박혀** 있으면, 그 값이 항상 이기고 인스턴스/페이지가 올바르게 설정한 모드를 무시한다. Variant를 통합할 때는 살아남는 컴포넌트에 이런 강제 바인딩이 있는지 먼저 확인하고 `clearExplicitVariableModeForCollection`으로 풀어야 한다 (`setExplicitVariableModeForCollection(coll, null)`은 에러 남 — 반드시 clear 메서드 사용).
3. **인스턴스 단위로 텍스트 스타일이 끊길 수 있다**: 마스터 컴포넌트를 고쳐도 이미 개별 인스턴스에 걸린 오버라이드(텍스트가 스타일에서 분리됨, `textStyleId === ''`)는 안 따라온다. Footer 실사용 인스턴스 7개가 이 상태였고, 원래 스타일 id로 `setTextStyleIdAsync`를 다시 걸어 복구했다. 컴포넌트 하나를 고쳤다고 끝난 게 아니라 **실제 페이지 인스턴스까지 재검증**해야 한다.
4. **`swapComponent`는 `layoutSizingHorizontal` 같은 레이아웃 속성도 새 메인 컴포넌트 기준으로 초기화한다**: 텍스트/이미지 내용만 확인하고 끝내면 안 된다. SubpageHero(8개)와 StoryDetailHeader(2개) 인스턴스가 스왑 후 `FIXED` 2560px로 리셋되어 모바일/태블릿 페이지에서 PC 폭 그대로 넘쳐 보이는 버그가 있었다. 스왑 후에는 `layoutSizingHorizontal`/`layoutSizingVertical`이 부모 auto-layout 기대치(FILL/HUG)와 맞는지 항상 재확인.
5. **아이콘처럼 인스턴스 내부에 중첩된 콘텐츠는 `resize()`/변수 바인딩만으로 비례 조정이 안 될 수 있다**: 내부 vector의 constraint가 `CENTER`면 프레임만 커지고 내용은 그대로 남아 잘린다. `SCALE` constraint로 바꾼 뒤에야 변수 바인딩이 내부까지 비례로 반영된다. 아이콘 크기를 변수화하기 전에 내부 노드의 constraint부터 확인할 것.
6. **Desktop이 absolute 포지셔닝(고정 좌표)인 grid는 gap을 변수로 못 묶는다**: Portfolio List의 Desktop 카드 그리드는 auto-layout이 아니라 일반 프레임 + 수동 좌표라서 카드 간격을 변수 하나로 통일할 수 없었다(의도된 설계). Tablet/Mobile은 auto-layout이라 문제없이 바인딩됨.
7. **`primaryAxisAlignItems: SPACE_BETWEEN`인 프레임의 `itemSpacing` 값은 렌더링에 안 쓰인다**: 숫자가 이상해 보여도(700 넘는 값 등) 버그가 아닐 수 있으니, 고치기 전에 반드시 `primaryAxisAlignItems`를 먼저 확인.
8. **읽기 전용 조회(`get_metadata`/`get_screenshot`/`get_design_context`)와 라이브 편집(`use_figma`)은 접근 범위가 다르다**: 라이브 편집은 Figma 데스크톱 세션이 그 페이지를 로드한 상태여야 동작한다. `figma.root.children.find(p => p.id === 'PAGE_ID')`로 페이지 객체를 얻은 뒤 `await page.loadAsync()`를 호출하면 강제로 로드된다 (`figma.loadAllPagesAsync`는 지원 안 됨). 스크립트 도중 에러가 나면 그 스크립트의 변경사항 전체가 롤백되는 것으로 보이니, 탐색용 코드와 실제 변경 코드는 분리해서 실행할 것.

## 7. 앞으로 반응형 값을 추가/수정할 때 체크리스트

1. 이미 같은 값(또는 같은 비율)을 쓰는 시멘틱 변수가 있는지 먼저 찾는다 — 없으면 새로 만들되 원시 스케일에 직접 물리지 말고 의미 있는 이름을 붙인다.
2. PC 값을 기준으로 Tablet/Mobile을 정할 때, 디자이너가 이미 확정한 비율이 있으면 그걸 따르고 없으면 0.75배씩 단계적으로 줄이는 것을 기본값으로 삼는다.
3. 대상 속성이 auto-layout 속성(itemSpacing, padding, fontSize)인지, absolute 좌표인지, 인스턴스 내부 중첩 콘텐츠(아이콘 vector 등)인지 먼저 구분한다 — 마지막 두 경우는 단순 변수 바인딩으로 안 될 수 있다.
4. 컴포넌트 마스터만 고치고 끝내지 말고, 실제 페이지에 배치된 인스턴스까지 스크린샷 등으로 재검증한다.
5. Variant를 줄이는 작업(스왑)을 했다면 콘텐츠뿐 아니라 `layoutSizingHorizontal`/`layoutSizingVertical`, 강제 모드 바인딩 여부도 같이 확인한다.
