# 특화 프로젝트

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



## 폴더 구조

### SASS

![image-20210913145508696](README.assets/image-20210913145508696.png)

#### `Base`

* 프로젝트용 표준 문안 관련 내용

#### `Components`

* 작은 구성 요소들을 위한 폴더
* layout 을 전역적 와이어프레임을 정의하는 매크로라 치면 이 폴더는 좀 더 마이크로

#### `Layout`

* 개별 파일에서 레이아웃의 주요 부분에 관한 스타일 정의

#### `Pages`

* 페이지에 특정화된 스타일이 있다면 pages 폴더에 넣고 페이지명과 파일명 일치시킴