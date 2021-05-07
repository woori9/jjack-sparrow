# Jjack-sparrow

## Introduction

- 반려동물을 주변의 이웃에게 맡길 수 있도록 매칭 시켜주는 실시간 C2C 서비스 입니다.

## Contents
- Motivation
- Installation
- Tech Stack
- Core Features
- How to Use
- Development Calendar
- Challenges
- Things to do

## Motivation

현재 앵무새 2마리를 기르고 있습니다. 앵무새는 정서적으로 예민한 편이기 때문에 앵무새를 집에 혼자 두고 집 밖에 오래 나와있는 날에는 굉장히 걱정이 많이 되었습니다. 집에 사람이 없을 때 앵무새를 맡아줄 만한 곳을 알아봤는데 못해도 한 시간 ~ 한 시간 반 거리의 앵무새 카페에 들러야만 했습니다. 그럴때마다 주변의 가깝고, 믿을만한 이웃에게 잠시 맡기면 좋겠다고 생각했던 것을 바탕으로 기획하게 되었습니다.

## Installation

Expo 어플을 다운받은 후 Frontend 및 Backend 에서 npm start를 입력해 실행해주세요.

```bash
npm start
```

<br>

## Tech Stack

### Frontend
<li>ES2015+</li>
<li>React Native for component-based-architecture</li>
<li>Redux for state management</li>
<li>React Native Async Storage to store token</li>
<li>StyleSheet Styled Component</li>
<li>Socket.io for real-time communication</li>
<li>AWS S3 for image file</li>

### Backend
<li>Node.js</li>
<li>Express</li>
<li>MongoDB / MongoDB Atlas for data persistence</li>
<li>Moongoose</li>
<li>JSON Web Token Authentication </li>
<li>Socket.io</li>
<li>AWS Elastic Beanstalk for Deploy</li>

### Planning Tools

- Figma for Mock Up
- Lucid Chart for Database Schema
- Notion for Project Schedule

<br>

## Core Features

- Facebook Login 및 JWT 토큰을 사용한 로그인을 구현했습니다.
- 사용자 및 반려동물의 프로필 등록을 할 수 있습니다.
- 사용자는 반려동물을 맡아달라고 요청하거나 요청을 받아줄 수 있습니다.
- 반려동물을 맡기고 싶은 사용자는 원하는 날짜와 시간을 입력해서 Form을 전송하면, 그 요청이 어플에 등록됩니다.
- 다른 사용자가 반려동물을 맡아주길 원한다면(Pet sitter), 지도에 들어가서 현재 자신의 위치 반경 2km안에 있는 요청들을 확인하고 수락할 수 있습니다.
- Pet sitter가 수락을 해서 매칭이 이루어지면 채팅방에서 대화를 나눌 수 있습니다.
- 반려동물을 맡아달라는 요청이 서비스 시작 1시간 전까지 매칭이 이루어지지 않으면 해당 요청 정보는 삭제됩니다.

<br>

## How to Use

1. 유저 정보 등록
- 사용자는 맨 처음 로그인시 주소 정보를 입력해야 합니다. 주소 정보는 Customer가 반려동물을 맡아달라는 요청을 할 경우 Pet Sitter에게 요청자의 대략적인 위치를 보여주기 위해서 등록하는 것입니다.
- 주소 정보를 등록하고나면 Main Page(Home Screen)을 볼 수 있습니다.

2. 펫 프로필 등록
- Drawer Navigation의 Pet Profile을 클릭하면 반려동물의 프로파일을 등록할 수 있는 폼이 나옵니다. 폼을 제출하면 반려동물 정보가 등록됩니다.

3. 매칭
- Tab Navigation의 Match Tab에 들어가면 사용자가 요청했던 Pending match(미수락)와 Success match(매칭 성공) 정보를 볼 수 있습니다.
- 2개의 버튼이 있습니다. 반려동물을 맡기고 싶다면 '도움이 필요해요' 버튼을, 반려동물을 맡아주고 싶다면 '도움을 주고 싶어요' 버튼을 클릭합니다.

##### 반려동물을 맡아달라는 요청을 한 사용자(Customer)

- '도움이 필요해요' 버튼을 누르면 하단에 반려동물을 맡기고 싶은 날짜와 시간을 선택할 수 있는 애니메이션 창이 뜹니다.
- 날짜와 시간을 선택하고 '확인' 버튼을 누르면 해당 정보가 DB에 저장되고 socket.io를 통해 현재 접속 중인 Pet Sitter에게도 실시간으로 요청 정보가 업데이트 됩니다.

##### 요청을 받아주는 사용자(PetSitter)
- '도움을 주고 싶어요' 버튼을 누르면 현재 내 위치를 기반으로 지도가 뜹니다. 그리고 반경 2km안에 있는 요청 정보들을 확인할 수 있습니다.
- 지도에는 요청한 Customer의 대략적인 위치와 Customer의 Pet 정보가 담긴 카드를 볼 수 있습니다. 카드를 읽고 '응답하기' 버튼을 누르면 매칭이 이루어집니다. 이 과정 역시 socket.io를 통해 실시간으로 이루어집니다.

4. 채팅
- 매칭에 성공했다면 상대방과 Tab Navigation의 Chat Tab 에 들어가서 상대방과 대화를 나눌 수 있습니다.

 5. 만료
- 만료가 이루어 지는 분기점은 총 2개가 있습니다. 매칭이 이루어지지 않은 채 Customer가 요청을 한 시간이 지나 만료되거나, 매칭 성공 이후에 서비스가 종료되어 만료되는 경우입니다.
- 매칭이 이루어지지 않은 채 만료가 되었다면 해당 매칭이 삭제된다는 문구와 함께 알람이 뜨고, DB에서 영구히 삭제됩니다.
- 매칭 성공 이후 만료가 되었다면 해당 매칭이 종료된다는 문구와 함께 알람이 뜨고, DB에서 매칭이 만료 상태로 업데이트 됩니다.

 6. 리뷰
- Match Tab의 '지난 매칭'에 들어가면 사용자의 과거 매칭 내역을 확인할 수 있습니다.
- Customer는 과거 매칭의 '후기 작성하기' 버튼을 누르고 리뷰를 작성할 수 있습니다. 총 1~5점까지의 점수와 간단한 코멘트를 기입할 수 있습니다.
- 후기를 작성했다면 Home 에서 새로 작성된 후기를 확인할 수 있습니다.

## Development Calendar

- Total Duration : 2020.11.30 ~ 2020.12.18(3 weeks = 1 week idea + 2 weeks development)

- Planning: 11.30 ~ 12.04
     - Mockup, Schema, Scheduling
     - Fronted, Backend Setting & Create Repository

- Development: 12.05 ~ 12.16
     - Facebook Social Login
     - Drawer Navigation, Tab Navigation, Stack Navigation 조정
     - Profile Screen, Home Screen, Match Screen, Chat Screen, Review Screen 개발

- Deploy & Test: 12. 16 ~ 2020. 12. 18
     - Elastic Beanstalk 을 이용한 Backend 배포 (현재는 일시 중지된 상태입니다.)

## Challenges

### React Native Screen 구조와 Navigation

- Redux의 User의 상태가 변할 때마다 HomeScreen으로 화면이 저절로 이동하는 일이 있었습니다. 디버깅 결과 앱에 접속했을 때 User가 Login을 한 상태이면 Home Screen을, 그렇지 않으면 Login Screen을 렌더링하는 삼항연산자 로직때문이라는 것을 알게되었습니다. Redux에 User의 로그인 상태뿐만 아니라 사용자의 반려동물, 매칭 정보 등을 담고 있었는데 로그인 외의 다른 정보들이 업데이트 될때마다 이 삼항연산자를 거쳐 계속 Home Screen으로 이동한 것이었습니다. 이 삼항연산자를 쓰게 된 이유는 이전에 Login Screen을 Home Stack에 넣었더니, Login Screen에서 보여서는 안 될 Tab Navigation이 보여서 Login Screen을 Home Stack과 분리하면서 생긴 것이었습니다.

- React로 웹개발을 할 때는 이렇게 해도 문제가 되지 않았었는데, 왜 계속 Home Screen으로 이동하는 건지 고민해본 결과 React Native의 Screen이 Stack으로 쌓이는 구조 때문인 것 같았습니다. 제가 짠 Navigation 구조에서는  Match Screen에 접근하려면 Home Screen을 밑에 깔아야만, 즉 Home Screen을 거쳐야 Match Screen으로 이동할 수 있습니다. 이때 Home Screen이 Unmount된 것이 아니기 때문에 Match Screen에서 Redux를 통해 User의 상태를 변경한 경우 계속해서 위의 삼항연산자를 거쳐서 Home Screen으로 이동하는 것일 거라고 예상했습니다. 그래서 User의 상태가 바뀌어도 위의 삼항연산자를 거치지 않도록 User의 로그인 여부를 가리키는 속성을 Redux에서 따로 분리해주었고, 그 이후 User를 업데이트 할 때마다 Home Screen으로 이동하는 문제는 발생하지 않았습니다.

### Matching Expiration

- 매칭이 만료되는 타이밍이 총 2개입니다. 대기 중이었던 매칭이 이루어지지 못하고 끝날 때와 매칭에 성공한 이후 서비스가 종료될 시간이 되어서 종료하는 것입니다. 유저가 앱에 접속했을 때 DB에서 유저의 매치 정보들을 가져오면서 매치마다 남은 시간을 milliseconds로 계산해서 setTimeout을 걸어주어 만료 시간이 지날 경우 삭제 및 업데이트 하도록 처리하였습니다.

- 이렇게 할 경우에 문제점은, 유저가 앱을 사용 중이어야지만 제때 업데이트가 된다는 것이었습니다. 유저가 앱을 사용하지 않는 동안에는 사실상 만료된 매치여도 삭제 및 업데이트가 되지 않기 때문에 Pet Sitter에게 대기 중인 매치 정보를 내려줄 때마다 또 일일이 남은 시간을 계산해서 해당 매칭이 유효한지 검사해야 했습니다. 이 시간의 갭을 유저의 접속에 의존하지 않고 조금이나마 줄여보고 싶었습니다.

- 서버에서 주기적으로 DB의 매칭 정보를 가져와 시간이 유효한지 검사를 해야하나 잠시 생각했지만 그 역시 서버에 불필요하게 부담을 주는 것 같았습니다. 고민 결과 처음에는 Pet Sitter가 대기 중인 매칭 정보를 가져온 경우에 단지 해당 매칭 시간이 유효한지 체크하고 필터링만 했지만, 이번엔 체크 후 유효하지 않다면 그때 바로 서버에 또 삭제하는 요청을 보내는 것이 낫겠다는 결론을 내렸습니다. 이렇게 하면 대기 중이던 매칭이 만료가 되었을 때 그 매칭을 가지고 있는 유저가 앱에 접속하고 있지 않더라도, 다른 유저가 대기 중인 매칭을 요청하면 만료되어 삭제될 것이기 때문에 시간의 갭을 줄임과 동시에 DB를 조금 더 효율적으로 관리할 수 있다고 생각했습니다.

## Things to do

<ul>
<li><input type='checkbox'> Frontend Test</input></li>
<li><input type='checkbox'> Backend Test</input></li>
<li><input type='checkbox'> Backend 재배포</input></li>
<li><input type='checkbox'> 컴포넌트 재사용 및 빠른 렌더링을 위한 리팩토링</input></li>
</ul>

## Links

- [Frontend Repository](https://github.com/Suri-Suri-Woori-Suri/TwoFaceTime-Frontend)

- [Backend Repository](https://github.com/Suri-Suri-Woori-Suri/TwoFaceTime-Backend)

- [Figma For Mock up](https://www.figma.com/file/8jGOgvPrArskeNV3d7j385/My-pet?node-id=0%3A10)

- [Lucid Chart (Database Schema)](https://lucid.app/lucidchart/99684a93-e85c-4293-970e-d0ef7166ed3b/edit?page=0_0#?folder_id=home&browser=icon)

- [Notion for Project Schedule](https://www.notion.so/1bd49b2bc8e3450c9fc723fae67f4457?v=d0cc457232b947a99ce6ebe699f49eff)

## Contributing


## License
